const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Cheese } = require('../lib/models/Cheese');

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

  it.skip('should return a cheese by id', async () => {
    const res = await request(app).get('/cheeses/2');
    const expected = {
      id: '2',
      name: 'Provolone',
      type: 'Stretched curd'
    };
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  it('should post a new cheese to the table', async () => {
    const cheese = new Cheese({
      name: 'Gruyere',
      type: 'Cooked pressed'
    });
    const res = await request(app).post('/cheese').send(cheese);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(cheese.name);
    expect(res.body.type).toEqual(cheese.type);
  });

  afterAll(() => {
    pool.end();
  });
});
