const express = require("express");
const router = express.Router();
const travelersController = require("../controllers/travelers.controller");

router.get('/', travelersController.getTravelers);
router.get('/:id', travelersController.getTravelerById);
router.post('/', travelersController.createTraveler);
router.put('/:id', travelersController.updateTraveler);
router.delete('/:id', travelersController.deleteTraveler);

module.exports = router;