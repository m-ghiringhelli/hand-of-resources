const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('venue routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of all the venues in the database', async () => {
    const res = await request(app).get('/venues');
    expect(res.status).toEqual(200);
    console.log(res.body);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Wonder Ballroom',
        quadrant: 'NE',
        capacity: 800
      },
      {
        id: '2',
        name: 'Doug Fir',
        quadrant: 'SE',
        capacity: 300
      },
      {
        id: '3',
        name: 'Crystal Ballroom',
        quadrant: 'SW',
        capacity: 1500
      }
    ]);
  })

  afterAll(() => {
    pool.end();
  })
})