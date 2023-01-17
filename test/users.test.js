//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  it('Lists all users', () => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(1);
        });
  });

  it.skip('Changes user language', () => {
    chai.request(server)
        .patch('/users/jdoe', {
          body: {
            preferred_language: 'fr',
          },
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          const json = res.body
          expect(json['preferred_language']).to.equal('fr');
        });
  });
});
