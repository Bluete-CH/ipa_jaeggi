const sql = require('./db');

const Vehicle = {};

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
