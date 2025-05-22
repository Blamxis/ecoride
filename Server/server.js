const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`));
