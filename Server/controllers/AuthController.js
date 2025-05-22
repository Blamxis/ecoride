const bcrypt = require('bcryptjs');
const prisma = require('../utils/prismaClient');

class AuthController {
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
        }
      });

      res.status(201).json({ message: 'Utilisateur créé', user: { id: user.id, pseudo: user.pseudo, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}

module.exports = new AuthController();
