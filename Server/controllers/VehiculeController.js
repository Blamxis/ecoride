const prisma = require("../utils/prismaClient");

class VehiculeController {
  async ajouterVehicule(req, res) {
    const { marque, modele, energie, couleur, immatriculation, annee } =
      req.body;

    if (
      !marque ||
      !modele ||
      !energie ||
      !couleur ||
      !immatriculation ||
      !annee
    ) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
      const vehicule = await prisma.vehicule.create({
        data: {
          marque,
          modele,
          energie,
          couleur,
          immatriculation,
          annee: parseInt(annee),
          conducteur: { connect: { id: req.user.userId } },
        },
      });

      res.status(201).json({ message: "Véhicule ajouté", vehicule });
    } catch (error) {
      console.error("Erreur ajout véhicule :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async afficherVehicule(req, res) {
    const { id } = req.params;

    try {
      const vehicule = await prisma.vehicule.findFirst({
        where: {
          id: parseInt(id),
          conducteurId: req.user.userId,
        },
      });

      if (!vehicule) {
        return res
          .status(404)
          .json({ message: "Véhicule introuvable ou non autorisé." });
      }

      res.json({ vehicule });
    } catch (error) {
      console.error("Erreur lecture véhicule :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async listerVehicules(req, res) {
    try {
      const vehicules = await prisma.vehicule.findMany({
        where: { conducteurId: req.user.userId },
      });

      res.json({ vehicules });
    } catch (error) {
      console.error("Erreur lecture véhicules :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async modifierVehicule(req, res) {
    const { id } = req.params;
    const { marque, modele, energie, couleur, immatriculation, annee } =
      req.body;

    try {
      const vehicule = await prisma.vehicule.updateMany({
        where: {
          id: parseInt(id),
          conducteurId: req.user.userId, // sécurise l'accès
        },
        data: {
          marque,
          modele,
          energie,
          couleur,
          immatriculation,
          annee: parseInt(annee),
        },
      });

      if (vehicule.count === 0) {
        return res
          .status(404)
          .json({ message: "Véhicule non trouvé ou non autorisé" });
      }

      res.json({ message: "Véhicule mis à jour" });
    } catch (error) {
      console.error("Erreur modification véhicule :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  async supprimerVehicule(req, res) {
    const { id } = req.params;

    try {
      const deleteResult = await prisma.vehicule.deleteMany({
        where: {
          id: parseInt(id),
          conducteurId: req.user.userId,
        },
      });

      if (deleteResult.count === 0) {
        return res
          .status(404)
          .json({ message: "Véhicule non trouvé ou non autorisé" });
      }

      res.json({ message: "Véhicule supprimé" });
    } catch (error) {
      console.error("Erreur suppression véhicule :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }
}

module.exports = new VehiculeController();
