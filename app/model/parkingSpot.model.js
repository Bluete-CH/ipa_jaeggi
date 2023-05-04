const sql = require('./db');

const ParkingSpot = {};

/**
 * Creates a new parking spot in the database
 *
 * @function
 * @param {object} parkingSpot - A parking spot object with properties
 * @param {int} parkingSpot.number - number is an int
 * @param {boolean} parkingSpot.charger_available - charger_available is a boolean
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.create = (parkingSpot) => new Promise((resolve, reject) => {
  const input = {
    number: parkingSpot.number,
    charger_available: parkingSpot.charger_available,
  };
  sql.query(
    'INSERT INTO tbl_parking_spot SET ?',
    [
      input,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('create parking spot: ', { id: res.insertId, ...parkingSpot });
      resolve({ id: res.insertId, ...parkingSpot });
    },
  );
});

/**
 * Gets all parking spots from the database
 *
 * @function
 * @returns {Promise<Array>} - A promise array, that includes an array with parking spots
 */
ParkingSpot.getAll = () => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_parking_spot',
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('parking spot: ', res);
      resolve(res);
    },
  );
});

/**
 * Gets all parking spots by availability on given date from the database
 *
 * @function
 * @param {object} rules - A rules object with properties
 * @param {string} rules.date - date is a string
 * @param {boolean} rules.half_day - half_day is a boolean
 * @param {boolean} rules.am - am is a boolean
 * @returns {Promise<Array>} - A promise array, that includes the given properties
 */
ParkingSpot.findByDate = (rules) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_reservation AS reservation INNER JOIN tbl_parking_spot AS parkingSpot ON reservation.parking_spot_id = parkingSpot.parking_spot_id WHERE date = ? AND half_day = ? AND am = ?',
    [
      rules.date,
      rules.half_day,
      rules.am,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error('No row with the given parameters found.');
        reject(err);
        return;
      }
      console.log('found reservation: ', res);
      resolve(res);
    },
  );
});

/**
 * Finds all parking spots that are reserved for today in the database
 *
 * @function
 * @returns {Promise<Array>} - A promise array, that includes the given properties
 */
ParkingSpot.findToday = () => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_reservation AS reservation INNER JOIN tbl_parking_spot AS parkingSpot ON reservation.parking_spot_id = parkingSpot.parking_spot_id WHERE date = CURRENT_DATE()',
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error('No row with the today\'s date found.');
        reject(err);
        return;
      }
      console.log('found today\'s reservation: ', res);
      resolve(res);
    },
  );
});

/**
 * Updates a parking spot in the database
 *
 * @function
 * @param {int} id - id is an int
 * @param {object} parkingSpot - A parking spot object with properties
 * @param {int} parkingSpot.number - number is an int
 * @param {boolean} parkingSpot.charger_available - charger_available is a boolean
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.updateById = (id, parkingSpot) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_parking_spot SET number = ?, charger_available = ? WHERE parking_spot_id = ?',
    [
      parkingSpot.number,
      parkingSpot.charger_available,
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error(`No row with the given id ${id} found.`);
        reject(err);
        return;
      }
      console.log('updated vehicle: ', { id, ...parkingSpot });
      resolve({ id, ...parkingSpot });
    },
  );
});

/**
 * Finds a parking spot by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.findById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_parking_spot WHERE parking_spot_id = ?',
    [
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.length) {
        console.log('found parking spot: ', res[0]);
        resolve(res);
      }
    },
  );
});

/**
 * Deletes a parking spot by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.delete = (id) => new Promise((resolve, reject) => {
  sql.query(
    'DELETE FROM tbl_parking_spot WHERE parking_spot_id = ?',
    [
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error(`No row with the given id ${id} found.`);
        reject(err);
        return;
      }
      console.log('deleted parking spot: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

/**
 * Sets a parking spot unavailable by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.setUnavailable = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_parking_spot SET unavailable = 1 WHERE parking_spot_id',
    [
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error(`No row with the given id ${id} found.`);
        reject(err);
        return;
      }
      console.log('unavailable parking spot: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

/**
 * Sets a parking spot available by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
ParkingSpot.setAvailable = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_parking_spot SET unavailable = 0 WHERE parking_spot_id',
    [
      id,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error(`No row with the given id ${id} found.`);
        reject(err);
        return;
      }
      console.log('available parking spot: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

module.exports = ParkingSpot;
