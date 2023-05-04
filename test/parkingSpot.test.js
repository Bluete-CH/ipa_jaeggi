/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

/**
 * Tests the API endpoint parkingSpots
 * @function
 * @name create
 * @name getAll
 * @name getByDate
 * @name getToday
 * @name updateById
 * @name findById
 * @name delete
 * @name setUnavailable
 * @name setAvailable
 */
describe('Parking Spots', () => {
  /**
   * Tries to create a new parking spot
   * @function
   * @name sendPostRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Create a new parking spot', () => {
    chai.request('http://localhost:2323')
      .post('/parking-spots', {
        body: {
          number: 50,
          chargerAvailable: 0,
          unavailable: 0,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.number).to.equal(50);
        expect(json.chargerAvailable).to.equal(0);
        expect(json.unavailable).to.equal(0);
      });
  });

  /**
   * Tries to get all parking spots
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get all parking spots', () => {
    chai.request('http://localhost:2323')
      .get('/parking-spots')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to get all parking spots by date
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get available parking spots by date', () => {
    chai.request('http://localhost:2323')
      .get('/parking-spots/availability')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      });
  });

  /**
   * Tries to list all parking spots by today
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('List parking spots and any reservations + vehicles on today\'s date', () => {
    chai.request('http://localhost:2323')
      .get('/parking-spot/today')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      });
  });

  /**
   * Tries to update a parking spot
   * @function
   * @name sendPatchRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Update parking spot', () => {
    chai.request('http://localhost:2323')
      .patch('/parking-spots/1', {
        body: {
          number: 6,
          chargerAvailable: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.number).to.equal(6);
        expect(json.chargerAvailable).to.equal(1);
      });
  });

  /**
   * Tries to get a parking spot
   * @function
   * @name sendGetRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Get a parking spot', () => {
    chai.request('http://localhost:2323')
      .get('/parking-spots/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  /**
   * Tries to delete a parking spot
   * @function
   * @name sendDeleteRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Remove a parking spot', () => {
    chai.request('http://localhost:2323')
      .delete('/parking-spots/2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });

  /**
   * Tries to set a parking spot as unavailable
   * @function
   * @name sendPutRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Set a parking spot as unavailable', () => {
    chai.request('http://localhost:2323')
      .put('/parking-spots/1/set_unavailable', {
        body: {
          unavailable: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.unavailable).to.equal(1);
      });
  });

  /**
   * Tries to set a parking spot as available
   * @function
   * @name sendPutRequest
   * @returns {Promise} A promise that resolves to the response object.
   */
  it('Set a parking spot as available', () => {
    chai.request('http://localhost:2323')
      .put('parking-spot/1/set_available', {
        body: {
          unavailable: 0,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.unavailable).to.equal(0);
      });
  });
});
