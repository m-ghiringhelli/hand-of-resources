const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Symphony } = require('../lib/models/Symphony');

describe('symphony routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of symphonies in the database', async () => {
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

  it.skip('should return a symphony by id', async () => {
    const res = await request(app).get('/symphonies/5');
    const expected = {
      id: '5',
      name: 'Symphony No. 5',
      key: 'C minor'
    };
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });

  it.skip('should post a new symphony to db', async () => {
    const symphony = new Symphony({
      name: 'Symphony No. 10',
      key: 'Eb minor'
    });
    const res = await request(app).post('/symphonies').send(symphony);
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual(symphony.name);
    expect(res.body.key).toEqual(symphony.key);
  });

  it.skip('should update info on one symphony by id', async () => {
    // eslint-disable-next-line quotes
    const res = await request(app).put('/symphonies/3').send({ name: `Symphony No. 3, 'Eroica'` });
    expect(res.status).toEqual(200);
    // eslint-disable-next-line quotes
    expect(res.body.name).toEqual(`Symphony No. 3, 'Eroica'`);
  });

  it.skip('should delete a row from table', async () => {
    const res = await request(app).delete('/symphonies/2');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/symphonies/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
