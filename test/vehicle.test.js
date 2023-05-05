/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const TOKEN = require('./tokens');

/**
 * Tests the API endpoint vehicles.
 * @function
 * @name create
 * @name getAll
 * @name updateById
 * @name findById
 * @name delete
 */
describe('Vehicles', () => {
  /**
   * Tries to create a new vehicle
   * @function
   * @name sendPostRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Create a new vehicle', () => {
    chai.request('http://localhost:2323/api')
      .post('/vehicles', {
        body: {
          ev: 0,
          licensePlateNumber: 'SO 25287',
          make: 'BMW',
          model: 'X5',
          userId: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.ev).to.equal(0);
        expect(json.licensePlateNumber).to.equal('SO 25287');
        expect(json.make).to.equal('BMW');
        expect(json.model).to.equal('X5');
        expect(json.userId).to.equal(1);
      });
  });

  /**
   * Tries to list all vehicles
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('List all vehicles by userId', () => {
    chai.request('http://localhost:2323/api')
      .get('/vehicles')
      .set('Cookie', `jwt=${TOKEN.admin}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.a.be('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to update a vehicle
   * @function
   * @name sendPatchRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Update a vehicle', () => {
    chai.request('http://localhost:2323/api')
      .patch('/vehicles/1', {
        body: {
          ev: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.ev).to.equal(1);
      });
  });

  /**
   * Tries to get a vehicle
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get a vehicle', () => {
    chai.request('http://localhost:2323/api')
      .get('/vehicles/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to delete a vehicle
   * @function
   * @name sendDeleteRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Delete a vehicle', () => {
    chai.request('http://localhost:2323/api')
      .delete('/vehicles/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });
});
