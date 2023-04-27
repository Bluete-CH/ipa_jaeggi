const sql = require('./db');

const User = {};

User.getAll = () => new Promise((resolve, reject) => {
  sql.query('SELECT * FROM tbl_user', (err, res) => {
    if (err) {
      console.error('error: ', err);
      reject(err);
      return;
    }
    console.log('user: ', res);
    resolve(res);
  });
});

User.updateById = (id, user) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET preferredLanguage = ? WHERE userId = ?',
    [
      user.preferredLanguage,
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
      console.log('updated user: ', { id, ...user });
      resolve({ id, ...user });
    },
  );
});

User.findById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_user WHERE userId = ?',
    [id],
    (err, res) => {
      if (err) {
        console.error('error: ', err);
        reject(err);
        return;
      }
      if (res.length) {
        console.log('found user: ', res[0]);
        resolve(res);
      }
    },
  );
});

User.changeRole = (role, id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET role = ? WHERE userId = ?',
    [role, id],
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
      console.log('changed role: ', { id, ...role });
      resolve({ id, ...role });
    },
  );
});

User.disableUser = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET disable = 1 WHERE userId = ?',
    [id],
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
      console.log('disabled user: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

User.enableUser = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET disable = 0 WHERE userId = ?',
    [id],
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
      console.log('enabled user: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

module.exports = User;
