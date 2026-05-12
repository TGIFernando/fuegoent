const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/knex');

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function safeUser(user) {
  const { password_hash, ...rest } = user;
  return rest;
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  const user = await db('users').where({ email: email.toLowerCase() }).first();
  if (!user || !user.is_active) return res.status(401).json({ error: 'Invalid credentials.' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

  res.json({ token: signToken(user), user: safeUser(user) });
});

// GET /api/auth/me  — requires valid token (attached by authenticate middleware)
router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated.' });
  res.json(safeUser(req.user));
});

module.exports = router;
