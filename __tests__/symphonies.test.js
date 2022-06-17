const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('symphony routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of symphonies in the database', async () => {
    const res = await request(app).get('/symphonies');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Symphony No. 1',
        key: 'C major'
      },
      {
        id: '2',
        name: 'Symphony No. 2',
        key: 'D major'
      },
      {
        id: '3',
        name: 'Symphony No. 3',
        key: 'Eb major'
      },
      {
        id: '4',
        name: 'Symphony No. 4',
        key: 'Bb major'
      },
      {
        id: '5',
        name: 'Symphony No. 5',
        key: 'C minor'
      },
      {
        id: '6',
        name: 'Symphony No. 6',
        key: 'F major'
      },
      {
        id: '7',
        name: 'Symphony No. 7',
        key: 'A major'
      },
      {
        id: '8',
        name: 'Symphony No. 8',
        key: 'F major'
      },
      {
        id: '9',
        name: 'Symphony No. 9',
        key: 'D minor'
      }
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
