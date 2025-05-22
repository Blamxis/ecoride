const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Test
app.get('/', (req, res) => res.send('🚀 API EcoRide opérationnelle'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`));
