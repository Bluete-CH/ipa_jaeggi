const sql = require('./db');

const User = {};

/**
 * Gets all users from the database
 *
 * @function
 * @returns {Promise<Array>} - A promise array, that includes an array with users
 */
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

/**
 * Updates a user in the database
 *
 * @function
 * @param {int} id - id is an int
 * @param {object} user - A parking spot object with properties
 * @param {string} user.preferred_language - preferredLanguage is a string
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
User.updateById = (id, user) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET preferred_language = ? WHERE user_id = ?',
    [
      user.preferred_language,
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

/**
 * Finds a user by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
User.findById = (id) => new Promise((resolve, reject) => {
  sql.query(
    'SELECT * FROM tbl_user WHERE user_id = ?',
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
        console.log('found user: ', res[0]);
        resolve(res);
      }
    },
  );
});

/**
 * Changes the role of a user by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @param {string} role - role is a string
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
User.changeRole = (id, role) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET role = ? WHERE user_id = ?',
    [
      role,
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
      console.log('changed role: ', { id, ...role });
      resolve({ id, ...role });
    },
  );
});

/**
 * Disables a user by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
User.disableUser = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET disable = 1 WHERE user_id = ?',
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
      console.log('disabled user: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

/**
 * Enables a user by ID in the database
 *
 * @function
 * @param {int} id - id is an int
 * @returns {Promise<object>} - A promise object, that includes the given properties
 */
User.enableUser = (id) => new Promise((resolve, reject) => {
  sql.query(
    'UPDATE tbl_user SET disable = 0 WHERE user_id = ?',
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
      console.log('enabled user: ', { id, ...res[0] });
      resolve({ id, ...res[0] });
    },
  );
});

module.exports = User;
