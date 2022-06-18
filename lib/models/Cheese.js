const pool = require('../utils/pool');

class Cheese {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM cheeses'
    );
    const data = rows.map((row) => new Cheese(row));
    return data;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM cheeses WHERE cheeses.id = $1',
      [id]
    );
    const data = rows[0];
    return data;
  }
}

module.exports = { Cheese };
