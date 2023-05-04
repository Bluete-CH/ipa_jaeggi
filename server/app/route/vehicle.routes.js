const express = require('express');

const router = express.Router();
const vehicle = require('../controller/vehicle.controller');

/**
 * Defines all endpoints and the functions for the vehicle API
 *
 * @param {Object} app - The express object
 * @module parkingSpotRoutes
 */
module.exports = (app) => {
  /**
   * Creates a new vehicle in the database
   *
   * @function
   */
  router.post('/', vehicle.create);

  /**
   * Gets all vehicles from the database
   *
   * @function
   */
  router.get('/', vehicle.getAll);

  /**
   * Updates a vehicle by ID in the database
   *
   * @function
   */
  router.patch('/:id', vehicle.updateById);

  /**
   * Finds a vehicle by ID
   *
   * @function
   */
  router.get('/:id', vehicle.findById);

  /**
   * Deletes a vehicle by ID
   *
   * @function
   */
  router.delete('/:id', vehicle.delete);

  app.use('api/vehicles', router);
};
