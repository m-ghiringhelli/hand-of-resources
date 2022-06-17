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
    const { rows } = pool.query(
      'SELECT * FROM boroughs'
    );
    const data = rows.map((row) => new Borough(row));
    return data;
  }
}

module.exports = { Borough };
