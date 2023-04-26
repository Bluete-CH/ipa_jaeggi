const express = require('express');

const router = express.Router();
const reservation = require('../controller/reservation.controller');

module.exports = (app) => {
  // Create a new reservation
  router.post('/', reservation.create);

  // Get all reservations
  router.get('/', reservation.findAll);

  // Update a reservation
  router.patch('/:id', reservation.updateById);

  // Get a reservation by Id
  router.get('/:id', reservation.findById);

  // Cancel a reservation
  router.put('/:id/cancel', reservation.cancelById);

  app.use('api/reservations', router);
};
