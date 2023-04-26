const express = require('express');

const router = express.Router();
const parkingSpot = require('../controller/parkingSpot.controller');

module.exports = (app) => {
  // Create a new parking spot
  router.post('/', parkingSpot.create);

  // Get all parking spots
  router.get('/', parkingSpot.findAll);

  // Get available parking spots by date
  router.get('/availability', parkingSpot.findByDate);

  // List parking spots and any reservations + vehicles on today's date
  router.get('/today', parkingSpot.findToday);

  // Update a parking spot
  router.patch('/:id', parkingSpot.updateById);

  // Get a parking spot
  router.get('/:id', parkingSpot.findById);

  // Remove a parking spot
  router.delete('/:id', parkingSpot.delete);

  // Set a parking spot unavailable
  router.put('/:id/set_unavailable', parkingSpot.setUnavailable);

  // Set a parking spot available
  router.put('/:id/set_available', parkingSpot.setAvailable);

  app.use('api/parking-spots', router);
};
