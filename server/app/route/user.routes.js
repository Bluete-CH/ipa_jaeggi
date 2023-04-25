const express = require('express');

const router = express.Router();
const user = require('../controller/user.controller');

module.exports = (app) => {
  // Get all users
  router.get('/', user.findAll);

  // Update a user
  router.patch('/update/:id', user.updateById);

  // Get a user
  router.get('/:id', user.findById);

  // Change role of user
  router.put('/role/:id', user.changeRole);

  // Disable a user
  router.put('/disable/:id', user.disableUser);

  // Enable a user
  router.put('/enable/:id', user.enableUser);

  app.use('api/user', router);
};
