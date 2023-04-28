const sql = require('./db');

const Reservation = {};

Reservation.create = () => new Promise((resolve, reject) => {
  const input = {
    parking_spot_id: reservation.parking_spot_id,
    user_id: reservation.user_id,
    vehicle_id: reservtion.vehicle_id,
    date: reservation.date,
    half_day: reservation.half_day,
    am: reservation.am,
  };
  sql.query(
    'INSERT INTO tbl_reservation SET ?',
    [
      input,
    ],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('create reservation: ', { id: res.insertId, ...reservation });
      resolve({ id: res.insertId, ...reservation });
    },
  );
});

Reservation.getAll = () => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_reservation',
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      console.log('reservation: ', res);
      resolve(res);
    },
  );
});

Reservation.updateById = (id, reservation) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_reservation SET parking_spot_id = ?, user_id = ?, vehicle_id = ?, date = ?, half_day = ?, am = ? WHERE reservation_id',
    [
      reservation.parking_spot_id,
      reservation.user_id,
      reservation.vehicle_id,
      reservation.date,
      reservation.half_day,
      reservation.am,
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
      console.log('updated reservation: ', { id, ...reservation });
      resolve({ id, ...reservation });
    },
  );
});

Reservation.findById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_reservation WHERE reservation_id = ?',
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
        console.log('found reservation: ', res[0]);
        resolve(res);
      }
    },
  );
});

Reservation.cancelById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_reservation SET cancelled = 1 WHERE reservation_id = ?',
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
      console.log('cancelled reservation: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

module.exports = Reservation;
