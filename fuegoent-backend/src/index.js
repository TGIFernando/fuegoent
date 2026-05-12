require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { authenticate } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const mediaRoutes = require('./routes/media');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Attach user from JWT on every request
app.use(authenticate);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fuegoent-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/media', mediaRoutes);

app.listen(PORT, () => {
  console.log(`FUEGO ENTERTAINMENT backend running on port ${PORT}`);
});
