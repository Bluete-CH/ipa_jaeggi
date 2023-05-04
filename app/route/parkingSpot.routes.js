const express = require('express');

const router = express.Router();
const parkingSpot = require('../controller/parkingSpot.controller');

/**
 * Defines all endpoints and the functions for the parkingSpot API
 *
 * @param {Object} app - The express object
 * @module parkingSpotRoutes
 */
module.exports = (app) => {
  /**
   * Creates a new parking spot in the database
   *
   * @function
   */
  router.post('/', parkingSpot.create);

  /**
   * Gets all parking spots from the database
   *
   * @function
   */
  router.get('/', parkingSpot.getAll);

  /**
   * Checks if a parking spot is available on given date
   *
   * @function
   */
  router.get('/availability', parkingSpot.findByDate);

  /**
   * Finds all parking spot that are reserved today
   *
   * @function
   */
  router.get('/today', parkingSpot.findToday);

  /**
   * Updates a parking spot by ID in the database
   *
   * @function
   */
  router.patch('/:id', parkingSpot.updateById);

  /**
   * Finds a parking spot by ID
   *
   * @function
   */
  router.get('/:id', parkingSpot.findById);

  /**
   * Deletes a parking spot by ID
   *
   * @function
   */
  router.delete('/:id', parkingSpot.delete);

  /**
   * Sets a parking spot unavailable in the database
   *
   * @function
   */
  router.put('/:id/set_unavailable', parkingSpot.setUnavailable);

  /**
   * Sets a parking spot available in the database
   *
   * @function
   */
  router.put('/:id/set_available', parkingSpot.setAvailable);

  app.use('/api/parking-spots', router);
};
