const Reservation = require('../model/reservation.model');
const include = require('../config/include');

/**
 * Creates a new reservation and send the result back
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
    if (!req.body.hasOwnProperty('parking_spot_id')) {
      errorMessages += 'Please provide a \'parking_spot_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('user_id')) {
      errorMessages += 'Please provide a \'user_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('vehicle_id')) {
      errorMessages += 'Please provide a \'vehicle_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('date')) {
      errorMessages += 'Please provide a \'date\' parameter. ';
    }
    if (!req.body.hasOwnProperty('half_day')) {
      errorMessages += 'Please provide a \'half_day\' parameter. ';
    }
    if (!req.body.hasOwnProperty('am')) {
      errorMessages += 'Please provide a \'am\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await Reservation.create(
      {
        parking_spot_id: req.body.parking_spot_id,
        user_id: req.body.user_id,
        vehicle_id: req.body.vehicle_id,
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
 * Get all reservations and send the result back
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
    const result = await Reservation.getAll();
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Updates a reservation by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a reservation ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.updateById = async (req, res) => {
  include.verifyToken(req, res);
  let errorMessages;
  try {
    errorMessages = '';
    if (!req.body.hasOwnProperty('parking_spot_id')) {
      errorMessages += 'Please provide a \'parking_spot_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('user_id')) {
      errorMessages += 'Please provide a \'user_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('vehicle_id')) {
      errorMessages += 'Please provide a \'vehicle_id\' parameter. ';
    }
    if (!req.body.hasOwnProperty('date')) {
      errorMessages += 'Please provide a \'date\' parameter. ';
    }
    if (!req.body.hasOwnProperty('half_day')) {
      errorMessages += 'Please provide a \'half_day\' parameter. ';
    }
    if (!req.body.hasOwnProperty('am')) {
      errorMessages += 'Please provide a \'am\' parameter. ';
    }
    if (errorMessages.length > 0) {
      // got some errors; returning early
      res.status(500).send({ message: `Some errors occurred: ${errorMessages}` });
      return;
    }
    const result = await Reservation.updateById(
      req.params.id,
      {
        parking_spot_id: req.body.parking_spot_id,
        user_id: req.body.user_id,
        vehicle_id: req.body.vehicle_id,
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
 * Finds a reservation by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a reservation ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.findById = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await Reservation.findById(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};

/**
 * Cancels a reservation by ID and send the result back
 *
 * @function
 * @async
 * @param {object} req - The request object from express with a reservation ID
 * @param {object} res - The request object from express
 * @returns {Promise<void>} - A Promise object waiting for completion
 */
exports.cancelById = async (req, res) => {
  include.verifyToken(req, res);
  try {
    const result = await Reservation.cancelById(req.params.id);
    res.send({ message: result, status: true });
  } catch (e) {
    res.status(500).send({ message: e, status: false });
  }
};
