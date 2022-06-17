const pool = require('../utils/pool');

class Borough {
  id;
  name;
  population;
  county;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.population = row.population;
    this.county = row.county;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM boroughs'
    );
    const data = rows.map((row) => new Borough(row));
    return data;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM boroughs WHERE id=$1',
      [id]
    );
    const data = rows[0];
    return data;
  }
}

module.exports = { Borough };
