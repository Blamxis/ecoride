const express = require('express');
const router = express.Router();
const vehiculeController = require('../controllers/VehiculeController');
const auth = require('../middlewares/auth');

router.post('/', auth, vehiculeController.ajouterVehicule);
router.get('/', auth, vehiculeController.listerVehicules);
router.get('/:id', auth, vehiculeController.afficherVehicule);
router.put('/:id', auth, vehiculeController.modifierVehicule);
router.delete('/:id', auth, vehiculeController.supprimerVehicule);

module.exports = router;
