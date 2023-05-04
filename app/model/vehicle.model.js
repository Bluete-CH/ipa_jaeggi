const sql = require('./db');

const Vehicle = {};

/**
 * Creates a new vehicle in the database
 *
 * @function
 * @param {object} vehicle - A vehicle object with properties
 * @param {boolean} vehicle.ev - ev is a boolean
 * @param {string} vehicle.license_plate_number - license_plate_number is a string
 * @param {string} vehicle.make - make is a string
 * @param {string} vehicle.model - model is a string
 * @param {Array<int>} vehicle.user_id - user_id is an array
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
Vehicle.create = (vehicle) => new Promise((resolve, reject) => {
  const input = {
    ev: vehicle.ev,
    license_plate_number: vehicle.license_plate_number,
    make: vehicle.make,
    model: vehicle.model,
    user_id: vehicle.user_id,
  };
  sql.query(
    'INSERT INTO tbl_vehicle SET ?',
    [
      input,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('create vehicle: ', { id: res.insertId, ...vehicle });
      resolve({ id: res.insertId, ...vehicle });
    },
  );
});

/**
 * Gets all vehicles from the database
 *
 * @function
 * @returns {Promise<Array>} - A promise array, that includes an array with vehicles
 */
Vehicle.getAll = () => new Promise((resolve, reject) => {
  sql.query('SELECT * FROM tbl_vehicle', (err, res) => {
    if (err) {
      console.error('error: ', err);
      reject(err);
      return;
    }
    console.log('vehicle: ', res);
    resolve(res);
  });
});

/**
 * Updates a vehicle in the database
 *
 * @function
 * @param {int} id - id is an int
 * @param {object} vehicle - A vehicle object with properties
 * @param {boolean} vehicle.ev - ev is a boolean
 * @param {string} vehicle.license_plate_number - license_plate_number is a string
 * @param {string} vehicle.make - make is a string
 * @param {string} vehicle.model - model is a string
 * @param {Array<int>} vehicle.user_id - user_id is an array
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
Vehicle.updateById = (id, vehicle) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_vehicle SET user_id = ?, ev = ?, license_plate_number = ?, make = ?, model = ? WHERE vehicle_id = ?',
    [
      vehicle.user_id,
      vehicle.ev,
      vehicle.license_plate_number,
      vehicle.make,
      vehicle.model,
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
      console.log('updated vehicle: ', { id, ...vehicle });
      resolve({ id, ...vehicle });
    },
  );
});

/**
 * Finds a vehicle by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
Vehicle.findById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_vehicle WHERE vehicle_id = ?',
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
        console.log('found vehicle: ', res[0]);
        resolve(res);
      }
    },
  );
});

/**
 * Deletes a vehicle by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
Vehicle.delete = (id) => new Promise((resolve, reject) => {
  sql.query(
    'DELETE FROM tbl_vehicle WHERE vehicle_id = ?',
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
      console.log('deleted vehicle: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

module.exports = Vehicle;
