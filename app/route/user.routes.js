const express = require('express');

const router = express.Router();
const user = require('../controller/user.controller');

/**
 * Defines all endpoints and the functions for the user API
 *
 * @param {Object} app - The express object
 * @module parkingSpotRoutes
 */
module.exports = (app) => {
  /**
   * Gets all users from the database
   *
   * @function
   */
  router.get('/', user.getAll);

  /**
   * Updates a user by ID in the database
   *
   * @function
   */
  router.patch('/users/:id', user.updateById);

  /**
   * Finds a user by ID
   *
   * @function
   */
  router.get('/:id', user.findById);

  /**
   * Changes the role of a user in the database
   *
   * @function
   */
  router.put('/:id/change_role', user.changeRole);

  /**
   * Disables a user in the database
   *
   * @function
   */
  router.put('/:id/disable', user.disableUser);

  /**
   * Enables a user in the database
   *
   * @function
   */
  router.put('/:id/enable', user.enableUser);

  app.use('/api/users', router);
};
