const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const receptyRoutes = require('./routes/recepty');
const ingredienceRoutes = require('./routes/ingredience');
const tagyRoutes = require('./routes/tagy');
const spizRoutes = require('./routes/spiz');

const app = express();
connectDB();
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiti
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/recepty', receptyRoutes);
app.use('/api/ingredience', ingredienceRoutes);
app.use('/api/tagy', tagyRoutes);
app.use('/api/spiz', spizRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Zbytkář Backend'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});

module.exports = app;
