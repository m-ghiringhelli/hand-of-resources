const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('venue routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of all the venues in the database', async () => {
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
  });

  it('should fetch details of one venue by id', async () => {
    const res = await request(app).get('/venues/1');
    const expected = {
      id: '1',
      name: 'Wonder Ballroom',
      quadrant: 'NE',
      capacity: 800
    };
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
