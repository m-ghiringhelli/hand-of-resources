const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Borough } = require('../lib/models/Borough');

describe('borough routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of all the boroughs', async () => {
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

  it.skip('should return a borough selected by id', async () => {
    const res = await request(app).get('/boroughs/4');
    const expected = {
      id: '4',
      name: 'Queens',
      population: 2405464,
      county: 'Queens County'
    };
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  it('should post a new borough', async () => {
    const borough = new Borough({
      name: 'Not New York',
      population: 100,
      county: 'Not New York County'
    });
    const res = await request(app).post('/boroughs').send(borough);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(borough.name);
    expect(res.body.population).toEqual(borough.population);
    expect(res.body.county).toEqual(borough.county);
  });
  
  it.skip('should update a borough by id', async () => {
    const res = await request(app).put('/boroughs/4').send({ population: 2500000 });
    expect(res.status).toEqual(200);
    expect(res.body.population).toEqual(2500000);
  });

  it('should delete a row from table', async () => {
    const res = await request(app).delete('/boroughs/5');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/boroughs/5');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
