const Vehicle = require('../model/vehicle.model');
const include = require('../config/include');

/**
 * Creates a new vehicle and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.create = async (req, res) => {
  include.verifyToken(req, res);
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('user_id')) {
      errorMessages += 'Please provide a \'user_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('ev')) {
      errorMessages += 'Please provide a \'ev\' parameter. ';
    }
    if (!req.body.hasOwnProperty('license_plate_number')) {
      errorMessages += 'Please provide a \'license_plate_number\' parameter. ';
    }
    if (!req.body.hasOwnProperty('make')) {
      errorMessages += 'Please provide a \'make\' parameter. ';
    }
    if (!req.body.hasOwnProperty('model')) {
      errorMessages += 'Please provide a \'model\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await Vehicle.create(
      {
        user_id: req.body.user_id,
        ev: req.body.ev,
        license_plate_number: req.body.license_plate_number,
        make: req.body.make,
        model: req.body.model,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Get all vehicles and send the result back
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
    const result = await Vehicle.getAll();
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Updates a vehicle by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a vehicle ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.updateById = async (req, res) => {
  include.verifyToken(req, res);
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('user_id')) {
      errorMessages += 'Please provide a \'user_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('ev')) {
      errorMessages += 'Please provide a \'ev\' parameter. ';
    }
    if (!req.body.hasOwnProperty('license_plate_number')) {
      errorMessages += 'Please provide a \'license_plate_number\' parameter. ';
    }
    if (!req.body.hasOwnProperty('make')) {
      errorMessages += 'Please provide a \'make\' parameter. ';
    }
    if (!req.body.hasOwnProperty('model')) {
      errorMessages += 'Please provide a \'model\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await Vehicle.updateById(
      req.params.id,
      {
        user_id: req.body.user_id,
        ev: req.body.ev,
        license_plate_number: req.body.license_plate_number,
        make: req.body.make,
        model: req.body.model,
      },
    );
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Finds a vehicle by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a vehicle ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findById = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await Vehicle.findById(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Deletes a vehicle by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a vehicle ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.delete = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await Vehicle.delete(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};
