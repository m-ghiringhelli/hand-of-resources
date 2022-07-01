const pool = require('../utils/pool');

class Beatle {
  id;
  name;
  instrument;
  hand;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.instrument = row.instrument;
    this.hand = row.hand;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM beatles'
    );
    const data = rows.map((row) => new Beatle(row));
    return data;
  }
}

module.exports = { Beatle };
