const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('borough routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of all the boroughs', async () => {
    const res = await request(app).get('/boroughs');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Manhattan',
        population: 1694251,
        county: 'New York County'
      },
      {
        id: '2',
        name: 'Brooklyn',
        population: 2736074,
        county: 'Kings County'
      },
      {
        id: '3',
        name: 'The Bronx',
        population: 1472654,
        county: 'Bronx County'
      },
      {
        id: '4',
        name: 'Queens',
        population: 2405464,
        county: 'Queens County'
      },
      {
        id: '5',
        name: 'Staten Island',
        population: 495747,
        county: 'Richmond County'
      }
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
