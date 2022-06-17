const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Venue } = require('../lib/models/Venue');

describe('venue routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of all the venues in the database', async () => {
    const res = await request(app).get('/venues');
    expect(res.status).toEqual(200);
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

  it.skip('should fetch details of one venue by id', async () => {
    const res = await request(app).get('/venues/1');
    const expected = {
      id: '1',
      name: 'Wonder Ballroom',
      quadrant: 'NE',
      capacity: 800
    };
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  it.skip('should post a new venue to db', async () => {
    const venue = new Venue({
      name: 'Keller Auditorium',
      quadrant: 'SW',
      capacity: 3000
    });
    const res = await request(app).post('/venues').send(venue);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(venue.name);
    expect(res.body.quadrant).toEqual(venue.quadrant);
    expect(res.body.capacity).toEqual(venue.capacity);
  });

  it('should update a venue by id', async () => {
    const res = await request(app).put('/venues/2').send({ name: 'Doug Fir Lounge' });
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('Doug Fir Lounge');
  });

  afterAll(() => {
    pool.end();
  });
});
