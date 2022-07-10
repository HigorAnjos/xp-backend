const request = require('supertest');
const { expect } = require('chai');
const app = require('../../server');

describe('Deve responder Hello World', function () {
  it('hello word', async function () {
    // Subir o servidor
    const res = await request(app).get('/');

    expect(res.body.message).to.be.equal('Hello World');
  });
});
