const express = require('express');

const router = express.Router();
const reservation = require('../controller/reservation.controller');

/**
 * Defines all endpoints and the functions for the reservation API
 *
 * @param {Object} app - The express object
 * @module parkingSpotRoutes
 */
module.exports = (app) => {
  // Create a new reservation
  router.post('/', reservation.create);

  /**
   * Gets all reservations from the database
   *
   * @function
   */
  router.get('/', reservation.getAll);

  /**
   * Updates a reservation by ID in the database
   *
   * @function
   */
  router.patch('/:id', reservation.updateById);

  /**
   * Finds a reservation by ID
   *
   * @function
   */
  router.get('/:id', reservation.findById);

  /**
   * Sets a reservation as cancelled by ID
   *
   * @function
   */
  router.put('/:id/cancel', reservation.cancelById);

  app.use('/api/reservations', router);
};
