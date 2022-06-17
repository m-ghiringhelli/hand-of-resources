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
}

module.exports = { Symphony }
