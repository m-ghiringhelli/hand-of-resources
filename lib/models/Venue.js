const pool = require('../utils/pool');

class Venue {
  id;
  name;
  quadrant;
  capacity;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.quadrant = row.quadrant;
    this.capacity = row.capacity;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM venues'
    );
    const data = rows.map((row) => new Venue(row));
    return data;
  }
}

module.exports = { Venue };
