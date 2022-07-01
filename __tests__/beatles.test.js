const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Beatle } = require('../lib/models/Beatle');

describe('beatles routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of beatles', async () => {
    const res = await request(app).get('/beatles');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'John Lennon',
        instrument: 'Guitar',
        hand: 'Right'
      },
      {
        id: '2',
        name: 'Paul McCartney',
        instrument: 'Bass',
        hand: 'Left'
      },
      {
        id: '3',
        name: 'George Harrison',
        instrument: 'Guitar',
        hand: 'Right'
      },
      {
        id: '4',
        name: 'Ringo Starr',
        instrument: 'Drums',
        hand: 'Right'
      }
    ]);
  });

  it.only('should fetch a beatle by id', async () => {
    const res = await request(app).get('/beatles/2');
    const expected = {
      id: '2',
      name: 'Paul McCartney',
      instrument: 'Bass',
      hand: 'Left'
    };
    console.log('res.body', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
