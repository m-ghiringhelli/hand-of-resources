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
    const { rows } = await pool.query(
      'INSERT INTO symphonies (name, key) VALUES ($1, $2) RETURNING *',
      [name, key]
    );
    return new Symphony(rows[0]);
  }

  static async updateById(id, attrs) {
    const symphony = await Symphony.getById(id);
    if (!symphony) return null;
    const { name, key } = { ...symphony, ...attrs };
    const { rows } = await pool.query(
      `UPDATE symphonies 
      SET name=$2, key=$3
      WHERE id=$1 RETURNING *`,
      [id, name, key]
    );
    return new Symphony(rows[0]);
  }
}

module.exports = { Symphony };
