const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaClient');

class AuthController {
  // Inscription
  async register(req, res) {
    const { pseudo, email, password } = req.body;

    if (!pseudo || !email || !password) {
      return res.status(400).json({ message: 'Champs requis.' });
    }

    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          pseudo,
          email,
          password: hashed,
          role: 'USER',
          credits: 20,
        },
      });

      res.status(201).json({
        message: 'Utilisateur créé',
        user: { id: user.id, pseudo: user.pseudo, email: user.email },
      });
    } catch (error) {
      console.error('Erreur register:', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  // Connexion
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Erreur login:', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}

module.exports = new AuthController();
