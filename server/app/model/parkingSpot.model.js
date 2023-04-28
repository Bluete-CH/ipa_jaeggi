const sql = require('./db');

const ParkingSpot = {};

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

// TODO
ParkingSpot.findByDate = () => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_parking_spot WHERE',
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('found reservation: ', res);
      resolve(res);
    },
  );
});

// TODO
ParkingSpot.findToday = (date) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_parking_spot WHERE date = ?',
    [
      date,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        console.error(`No row with the today's date ${date} found.`);
        reject(err);
        return;
      }
      console.log('found today\'s reservation: ', res);
      resolve(res);
    },
  );
});

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
