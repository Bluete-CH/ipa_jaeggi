/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

/**
 * Tests the API endpoint users.
 * @function
 * @name getAll
 * @name updateById
 * @name findById
 * @name changeRole
 * @name disableUser
 * @name enableUser
 */
describe('Users', () => {
  it('Lists all users', () => {
    /**
       * Tries to get all users
       * @function
       * @name sendGetRequest
       * @returns {Promise} A promise that resolves to the response object.
       */
    chai.request('http://localhost:2323/api')
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to change a user
   * @function
   * @name sendPatchRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Change preferred language', () => {
    chai.request('http://localhost:2323/api')
      .patch('/users/1', {
        body: {
          preferredLanguage: 'de',
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.preferredLanguage).to.equal('de');
      });
  });

  /**
   * Tries to get a user
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get a user', () => {
    chai.request('http://localhost:2323/api')
      .get('/users/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to change the role of a user
   * @function
   * @name sendPutRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Change the role of a user', () => {
    chai.request('http://localhost:2323/api')
      .put('/users/1/change_role', {
        body: {
          role: 'admin',
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.role).to.equal('admin');
      });
  });

  /**
   * Tries to disable a user
   * @function
   * @name sendPutRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Disable a user', () => {
    chai.request('http://localhost:2323/api')
      .put('/users/1/disable', {
        body: {
          disabled: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.disabled).to.equal(1);
      });
  });

  /**
   * Tries to enable a user
   * @function
   * @name sendPutRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Enable a user', () => {
    chai.request('http://localhost:2323/api')
      .put('/users/1/enable', {
        body: {
          disabled: 0,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.disabled).to.equal(0);
      });
  });
});
