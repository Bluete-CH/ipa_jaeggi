// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtSecret = fs.readFileSync('./.secret/jwtSecret.txt').toString().trim();

module.exports = {
  /**
   * @param req
   * @param res
   * @returns {string}
   */
  verifyToken(req, res) {
    const token = req.cookies.jwt;
    let userId;

    if (!token) {
      res.status(401).end();
    }
    let data;
    try {
      // Parse the JWT string and store the result in `payload`.
      // Passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match
      data = jwt.verify(token, jwtSecret);
      userId = data.userId;
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        res.status(401).end();
      }
      // otherwise, return a bad request error
      res.status(400).end();
    }

    return `${userId}`;
  },
  jwtSecret,
};
