/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Vehicles', () => {
  it.skip('Create a new vehicle', () => {
    chai.request(server)
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

  it.skip('List all vehicles by userId', () => {
    chai.request(server)
      .get('/vehicles')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.a.be('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Update a vehicle', () => {
    chai.request(server)
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

  it.skip('Get a vehicle', () => {
    chai.request(server)
      .get('/vehicles/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Delete a vehicle', () => {
    chai.request(server)
      .delete('/vehicles/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });
});
