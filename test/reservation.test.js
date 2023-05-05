/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const TOKEN = require('./tokens');

/**
 * Tests the API endpoint reservations.
 * @function
 * @name create
 * @name getAll
 * @name updateById
 * @name findById
 * @name cancelled
 */
describe('Reservations', () => {
  /**
   * Tries to create a new reservation
   * @function
   * @name sendPostRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Create a new reservation', () => {
    chai.request('http://localhost:2323/api')
      .post('/reservations', {
        body: {
          cancelled: 0,
          date: '2023-05-15',
          halfDay: 1,
          am: 1,
          userId: 1,
          vehicleId: 1,
          parkingSpotId: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.cancelled).to.equal(0);
        expect(json.date).to.equal('2023-05-15');
        expect(json.halfDay).to.equal(1);
        expect(json.am).to.equal(1);
        expect(json.userId).to.equal(1);
        expect(json.vehicleId).to.equal(1);
        expect(json.parkingSpotId).to.equal(1);
      });
  });

  /**
   * Tries to get all reservations
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('List all reservations', () => {
    chai.request('http://localhost:2323/api')
      .get('/reservations')
      .set('Cookie', `jwt=${TOKEN.admin}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to update a reservation
   * @function
   * @name sendPatchRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Update a reservation', () => {
    chai.request('http://localhost:2323/api')
      .patch('/reservations/1', {
        body: {
          halfDay: 0,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.halfDay).to.equal(0);
      });
  });

  /**
   * Tries to create a new reservation
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get a reservation', () => {
    chai.request('http://localhost:2323/api')
      .get('/reservations/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to cancel a reservation
   * @function
   * @name sendPostRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Cancel a reservation', () => {
    chai.request('http://localhost:2323/api')
      .put('/reservations/1/cancel', {
        body: {
          cancelled: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.cancelled).to.equal(1);
      });
  });
});
