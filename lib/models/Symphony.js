const pool = require('../utils/pool');

class Symphony {
  id;
  name;
  key;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.key = row.key;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM symphonies'
    );
    const data = rows.map((row) => new Symphony(row));
    return data;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM symphonies WHERE symphonies.id=$1',
      [id]
    );
    const data = rows[0];
    return data;
  } 

  static async insert({ name, key }) {
    const { rows } = pool.query(
      'INSERT INTO symphonies (name, key) VALUES ($1, $2) RETURNING *',
      [name, key]
    );
    return new Symphony(rows[0]);
  }
}

module.exports = { Symphony };
