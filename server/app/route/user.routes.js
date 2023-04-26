const express = require('express');

const router = express.Router();
const user = require('../controller/user.controller');

module.exports = (app) => {
  // Get all users
  router.get('/', user.findAll);

  // Update a user
  router.patch('/users/:id', user.updateById);

  // Get a user
  router.get('/:id', user.findById);

  // Change role of user
  router.put('/:id/change_role', user.changeRole);

  // Disable a user
  router.put('/:id/disable', user.disableUser);

  // Enable a user
  router.put('/:id/enable', user.enableUser);

  app.use('api/users', router);
};
