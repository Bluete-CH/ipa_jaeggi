/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Reservations', () => {
  it.skip('Create a new reservation', () => {
    chai.request(server)
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

  it.skip('List all reservations', () => {
    chai.request(server)
      .get('/reservations')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Update a reservation', () => {
    chai.request(server)
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

  it.skip('Get a reservation', () => {
    chai.request(server)
      .get('/reservations/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Cancel a reservation', () => {
    chai.request(server)
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
