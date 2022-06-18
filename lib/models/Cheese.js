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
}

module.exports = { Cheese };
