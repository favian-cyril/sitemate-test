const app = require('./index');
const request = require('supertest');

describe('index.js', () => {
  const body = { id: '1', title: 'foo', description: 'bar' }
  it('should be able to store issue', () => {
    return request(app)
        .post("/issues")
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toStrictEqual(body);
        })
  })
  it('should be able to get all stored issues', () => {
    return request(app)
        .get("/issues")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
        })
  })
  it('should be able to get specific stored issue', () => {
    return request(app)
        .get("/issues/1")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toStrictEqual(body);
        })
  })
  it('should return error if id is not found', () => {
    return request(app)
        .get("/issues/2")
        .then((res) => {
            expect(res.status).toBe(400);
        })
  })
  it('should be able to update data', () => {
    const newBody = { id: '1', title: 'foobar', description: 'baz' }
    return request(app)
      .put("/issues")
      .send(newBody)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toStrictEqual(newBody);
      })
  })
  it('should be able to delete data', () => {
    return request(app)
      .put("/issues")
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toStrictEqual(body);
      })
  })
})