/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const { expect } = chai;

chai.use(chaiHttp);

describe('App', () => {
  it('Shows index page', () => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.contain('IPA');
      });
  });

  it('Shows 404 page', () => {
    chai.request(server)
      .get('/nope')
      .end((err, res) => {
        expect(res.status).to.equal(404);
      });
  });
});
