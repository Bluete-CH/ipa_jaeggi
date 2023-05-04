// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');
const jwt = require('../config/include');

/**
 * Login the user in
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
// eslint-disable-next-line consistent-return
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: 'Login not successful',
      error: 'Username or Password not provided.',
    });
  }

  try {
    const user = await User.login({ username });
    // if user not found
    if (!user[0]) {
      return res.status(401).json({
        message: 'Login Failed',
        error: 'Your username or password is incorrrect.',
      });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (validPassword) {
      const maxAge = 3 * 60 * 60;

      const token = jwt.sign(
        { userId: user[0].userId, username },
        include.jwtSecret,
        {
          expiresIn: maxAge, // 3hrs in sec
        },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });
      res.status(200).json({
        message: 'Login Successful',
        userId: user[0].userId,
      });
    } else { res.status(400).json({ message: 'Login Failed', error: 'Your username or password is incorrrect.' }); }
  } catch (e) {
    res.status(400).send({ message: e, status: false });
  }
};

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
  include.verifyToken(req, res);
  try {
    const result = await User.getAll();
    res.status(200).send({ message: result, status: true });
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
  include.verifyToken(req, res);
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
  include.verifyToken(req, res);
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
  include.verifyToken(req, res);
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
  include.verifyToken(req, res);
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
  include.verifyToken(req, res);
  try {
    const result = await User.enableUser(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};
