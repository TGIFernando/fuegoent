const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../db/knex');
const { requirePermission, RANK } = require('../middleware/auth');

const PERMISSION_LEVELS = ['guest', 'user', 'poweruser', 'manager', 'owner'];

function safeUser(user) {
  const { password_hash, ...rest } = user;
  return rest;
}

// GET /api/users  — manager+
router.get('/', requirePermission('manager'), async (req, res) => {
  const users = await db('users').orderBy('id');
  res.json(users.map(safeUser));
});

// GET /api/users/:id  — self or manager+
router.get('/:id', async (req, res) => {
  const isSelf = req.user && req.user.id === Number(req.params.id);
  const isManager = req.user && RANK[req.user.permission_level] >= RANK['manager'];
  if (!isSelf && !isManager) return res.status(403).json({ error: 'Insufficient permissions.' });

  const user = await db('users').where({ id: req.params.id }).first();
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json(safeUser(user));
});

// POST /api/users  — create user (manager+)
router.post('/', requirePermission('manager'), async (req, res) => {
  const { name, email, password, permission_level = 'user' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, and password are required.' });
  if (!PERMISSION_LEVELS.includes(permission_level)) return res.status(400).json({ error: 'Invalid permission_level.' });

  // Only owner can create owner/manager accounts
  const callerRank = RANK[req.user.permission_level];
  if (RANK[permission_level] > callerRank) {
    return res.status(403).json({ error: 'Cannot create a user with a higher permission level than your own.' });
  }

  const existing = await db('users').where({ email: email.toLowerCase() }).first();
  if (existing) return res.status(409).json({ error: 'Email already in use.' });

  const password_hash = await bcrypt.hash(password, 12);
  const [id] = await db('users').insert({ name, email: email.toLowerCase(), password_hash, permission_level });
  const user = await db('users').where({ id }).first();
  res.status(201).json(safeUser(user));
});

// PUT /api/users/:id  — update user (self for basic fields; manager+ for permission)
router.put('/:id', async (req, res) => {
  const targetId = Number(req.params.id);
  const isSelf = req.user && req.user.id === targetId;
  const callerRank = req.user ? RANK[req.user.permission_level] : -1;
  const isManager = callerRank >= RANK['manager'];

  if (!isSelf && !isManager) return res.status(403).json({ error: 'Insufficient permissions.' });

  const user = await db('users').where({ id: targetId }).first();
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const updates = {};
  const { name, email, password, permission_level, is_active } = req.body;

  if (name) updates.name = name;
  if (email) updates.email = email.toLowerCase();
  if (password) updates.password_hash = await bcrypt.hash(password, 12);

  if (permission_level !== undefined) {
    if (!isManager) return res.status(403).json({ error: 'Only managers can change permission levels.' });
    if (!PERMISSION_LEVELS.includes(permission_level)) return res.status(400).json({ error: 'Invalid permission_level.' });
    if (RANK[permission_level] > callerRank) {
      return res.status(403).json({ error: 'Cannot assign a permission level higher than your own.' });
    }
    updates.permission_level = permission_level;
  }

  if (is_active !== undefined && isManager) updates.is_active = is_active;

  await db('users').where({ id: targetId }).update(updates);
  const updated = await db('users').where({ id: targetId }).first();
  res.json(safeUser(updated));
});

// DELETE /api/users/:id  — owner only
router.delete('/:id', requirePermission('owner'), async (req, res) => {
  const targetId = Number(req.params.id);
  if (req.user.id === targetId) return res.status(400).json({ error: 'Cannot delete your own account.' });

  const deleted = await db('users').where({ id: targetId }).del();
  if (!deleted) return res.status(404).json({ error: 'User not found.' });
  res.json({ message: 'User deleted.' });
});

module.exports = router;
