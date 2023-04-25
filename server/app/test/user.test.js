/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  it.skip('Lists all users', () => {
    chai.request(server)
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Change preferred language', () => {
    chai.request(server)
      .patch('/users/1', {
        body: {
          preferredLanguage: 'en',
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.preferredLanguage).to.equal('en');
      });
  });

  it.skip('Get a user', () => {
    chai.request(server)
      .get('/users/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(1);
      });
  });

  it.skip('Change the role of a user', () => {
    chai.request(server)
      .put('/users/1/change_role', {
        body: {
          role: 1,
        },
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const json = res.body;
        expect(json.role).to.equal(1);
      });
  });

  it.skip('Disable a user', () => {
    chai.request(server)
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

  it.skip('Enable a user', () => {
    chai.request(server)
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
