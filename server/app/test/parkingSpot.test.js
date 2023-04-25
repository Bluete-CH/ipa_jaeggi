/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Parking Spots', () => {
  it.skip('Create a new parking spot', () => {
    chai.request(server)
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

  it.skip('Get all parking spots', () => {
    chai.request(server)
      .get('/parking-spots')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Get available parking spots by date', () => {
    chai.request(server)
      .get('/parking-spots/availability')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      });
  });

  it.skip('List parking spots and any reservations + vehicles on today\'s date', () => {
    chai.request(server)
      .get('/parking-spot/today')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      });
  });

  it.skip('Update parking spot', () => {
    chai.request(server)
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

  it.skip('Get a parking spot', () => {
    chai.request(server)
      .get('/parking-spots/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Remove a parking spot', () => {
    chai.request(server)
      .delete('/parking-spots/2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });

  it.skip('Set a parking spot as unavailable', () => {
    chai.request(server)
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

  it.skip('Set a parking spot as available', () => {
    chai.request(server)
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
