const User = require('../model/user.model');

/**
 * Get all users and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.getAll = async (req, res) => {
  try {
    const result = await User.getAll();
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Updates a user by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a user ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.updateById = async (req, res) => {
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('preferred_language')) {
      errorMessages += 'Please provide a \'preferred_language\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await User.updateById(
      req.params.id,
      {
        preferred_language: req.body.preferred_language,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Finds a user by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a user ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Change the role of a user by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a user ID and the role of the user
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.changeRole = async (req, res) => {
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('role')) {
      errorMessages += 'Please provide a \'role\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await User.updateById(
      req.params.id,
      {
        role: req.body.role,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Disables a user by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a user ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.disableUser = async (req, res) => {
  try {
    const result = await User.disableUser(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Enables a user by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a user ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.enableUser = async (req, res) => {
  try {
    const result = await User.enableUser(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};
