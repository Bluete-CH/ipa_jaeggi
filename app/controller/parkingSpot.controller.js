const ParkingSpot = require('../model/parkingSpot.model');
const include = require('../config/include');
const User = require("../model/user.model");

/**
 * Creates a new parking spot and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.create = async (req, res) => {
  const userId = include.verifyToken(req, res);
  if (!userId) {
    return;
  }
  let errorMessages;
  try {
    const user = await User.findById(userId);

    if (user.role !== 'admin') {
      res.status(403).send({ message: 'Unauthorized' });
      return;
    }

    errorMessages = '';
    if (!req.body.hasOwnProperty('number')) {
      errorMessages += 'Please provide a \'number\' parameter. ';
    }
    if (!req.body.hasOwnProperty('charger_available')) {
      errorMessages += 'Please provide a \'charger_available\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await ParkingSpot.create(
      {
        number: req.body.number,
        charger_available: req.body.charger_available,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Get all parking spots and send the result back
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
    const result = await ParkingSpot.getAll();
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Get all parking spots that are available on given date or day time and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findByDate = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.findByDate(
      {
        date: req.body.date,
        half_day: req.body.half_day,
        am: req.body.am,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Get all parking spots that have a reservation today and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findToday = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.findToday();
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Updates a parking spot by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a parking spot ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.updateById = async (req, res) => {
  include.verifyToken(req, res);
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('number')) {
      errorMessages += 'Please provide a \'number\' parameter. ';
    }
    if (!req.body.hasOwnProperty('charger_available')) {
      errorMessages += 'Please provide a \'charger_available\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await ParkingSpot.updateById(
      req.params.id,
      {
        number: req.body.number,
        charger_available: req.body.charger_available,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Finds a parking spot by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a parking spot ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findById = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.findById(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Deletes a parking spot by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a parking spot ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.delete = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.delete(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Set a parking spot unavailable by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a parking spot ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.setUnavailable = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.setUnavailable(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Set a parking spot available by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a parking spot ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.setAvailable = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await ParkingSpot.setAvailable(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};
