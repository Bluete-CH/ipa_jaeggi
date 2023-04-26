const express = require('express');

const router = express.Router();
const vehicle = require('../controller/vehicle.controller');

module.exports = (app) => {
  // Create a new vehicle
  router.post('/', vehicle.create);

  // Get all vehicles
  router.get('/', vehicle.findAll);

  // Update a vehicle
  router.patch('/:id', vehicle.updateById);

  // Get a vehicle by Id
  router.get('/:id', vehicle.findById);

  // Delete a vehicle
  router.delete('/:id', vehicle.delete);
};
