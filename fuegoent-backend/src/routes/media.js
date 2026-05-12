const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/knex');
const { requirePermission } = require('../middleware/auth');

const UPLOAD_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|avif/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  },
});

const VALID_CATEGORIES = ['archive', 'collections', 'deseo', 'traviesa', 'events', 'products', 'hero'];

// GET /api/media  — public; supports ?category=&is_active=
router.get('/', async (req, res) => {
  let query = db('media').orderBy(['category', 'sort_order']);
  if (req.query.category) query = query.where({ category: req.query.category });
  if (req.query.is_active !== undefined) query = query.where({ is_active: req.query.is_active === 'true' });
  res.json(await query);
});

// GET /api/media/:id  — public
router.get('/:id', async (req, res) => {
  const item = await db('media').where({ id: req.params.id }).first();
  if (!item) return res.status(404).json({ error: 'Media not found.' });
  res.json(item);
});

// POST /api/media  — manager+; accepts multipart/form-data with optional file
router.post('/', requirePermission('manager'), upload.single('file'), async (req, res) => {
  const { title, description = '', category, price, event_date, tags = '', is_active = true, sort_order = 0 } = req.body;

  if (!title || !category) return res.status(400).json({ error: 'title and category are required.' });
  if (!VALID_CATEGORIES.includes(category)) return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}.` });

  let filename, filepath, mimetype;
  if (req.file) {
    filename = req.file.filename;
    filepath = `/uploads/${req.file.filename}`;
    mimetype = req.file.mimetype;
  } else if (req.body.filepath) {
    filepath = req.body.filepath;
    filename = path.basename(filepath);
    mimetype = req.body.mimetype || 'image/jpeg';
  } else {
    return res.status(400).json({ error: 'A file upload or filepath is required.' });
  }

  const [id] = await db('media').insert({
    title,
    description,
    filename,
    filepath,
    mimetype,
    category,
    price: price ? parseFloat(price) : null,
    event_date: event_date || null,
    tags,
    is_active: is_active === 'false' ? false : Boolean(is_active),
    sort_order: parseInt(sort_order, 10) || 0,
  });

  const item = await db('media').where({ id }).first();
  res.status(201).json(item);
});

// PUT /api/media/:id  — manager+
router.put('/:id', requirePermission('manager'), upload.single('file'), async (req, res) => {
  const item = await db('media').where({ id: req.params.id }).first();
  if (!item) return res.status(404).json({ error: 'Media not found.' });

  const { title, description, category, price, event_date, tags, is_active, sort_order } = req.body;
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (category !== undefined) {
    if (!VALID_CATEGORIES.includes(category)) return res.status(400).json({ error: 'Invalid category.' });
    updates.category = category;
  }
  if (price !== undefined) updates.price = price === '' ? null : parseFloat(price);
  if (event_date !== undefined) updates.event_date = event_date || null;
  if (tags !== undefined) updates.tags = tags;
  if (is_active !== undefined) updates.is_active = is_active === 'false' ? false : Boolean(is_active);
  if (sort_order !== undefined) updates.sort_order = parseInt(sort_order, 10) || 0;

  if (req.file) {
    updates.filename = req.file.filename;
    updates.filepath = `/uploads/${req.file.filename}`;
    updates.mimetype = req.file.mimetype;
  }

  await db('media').where({ id: req.params.id }).update(updates);
  res.json(await db('media').where({ id: req.params.id }).first());
});

// DELETE /api/media/:id  — manager+
router.delete('/:id', requirePermission('manager'), async (req, res) => {
  const item = await db('media').where({ id: req.params.id }).first();
  if (!item) return res.status(404).json({ error: 'Media not found.' });

  // Only delete physically uploaded files (not the original /images/* assets)
  if (item.filepath.startsWith('/uploads/')) {
    const fullPath = path.join(UPLOAD_DIR, item.filename);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }

  await db('media').where({ id: req.params.id }).del();
  res.json({ message: 'Media deleted.' });
});

module.exports = router;
