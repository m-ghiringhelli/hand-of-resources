const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cheese routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of cheeses', async () => {
    const res = await request(app).get('/cheeses');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Ricotta',
        type: 'Whey cheese'
      },
      {
        id: '2',
        name: 'Provolone',
        type: 'Stretched curd'
      },
      {
        id: '3',
        name: 'Emmental',
        type: 'Cooked pressed'
      }
    ]);
  });

  it('should return a cheese by id', async () => {
    const res = await request(app).get('/cheeses/2');
    const expected = {
      id: '2',
      name: 'Provolone',
      type: 'Stretched curd'
    };
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
