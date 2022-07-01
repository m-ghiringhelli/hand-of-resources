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

  it('should fetch a beatle by id', async () => {
    const res = await request(app).get('/beatles/2');
    const expected = {
      id: '2',
      name: 'Paul McCartney',
      instrument: 'Bass',
      hand: 'Left'
    };
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expected);
  });

  it('should add a beatle to the table', async () => {
    const testBeatle = new Beatle({
      name: 'Yoko Ono',
      instrument: 'Caterwauling',
      hand: 'Right'
    });
    const res = await request(app).post('/beatles').send(testBeatle);
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual(testBeatle.name);
    expect(res.body.instrument).toEqual(testBeatle.instrument);
  });

  it('should update a beatle row', async () => {
    const res = await request(app).put('/beatles/2').send({ instrument: 'Everything' });
    expect(res.status).toBe(200);
    expect(res.body.instrument).toEqual('Everything');
  });

  it('should delete a row', async () => {
    const res = await request(app).delete('/beatles/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/beatles/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
