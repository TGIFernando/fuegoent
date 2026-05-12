const jwt = require('jsonwebtoken');
const db = require('../db/knex');

// Permission rank — higher number = more access
const RANK = { guest: 0, user: 1, poweruser: 2, manager: 3, owner: 4 };

// Attach req.user if a valid JWT is present (does NOT block the request)
async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();

  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    const user = await db('users').where({ id: payload.id, is_active: true }).first();
    if (user) req.user = user;
  } catch (_) {
    // invalid / expired token — continue as unauthenticated
  }
  next();
}

// Require a minimum permission level
function requirePermission(level) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required.' });
    if (RANK[req.user.permission_level] < RANK[level]) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }
    next();
  };
}

module.exports = { authenticate, requirePermission, RANK };
