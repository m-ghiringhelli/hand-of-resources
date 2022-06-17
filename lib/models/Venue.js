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

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM venues WHERE venues.id = $1',
      [id]
    );
    const data = rows[0];
    return data;
  }

  static async insert({ name, quadrant, capacity }) {
    const { rows } = await pool.query(
      // eslint-disable-next-line quotes
      `INSERT INTO venues (name, quadrant, capacity) VALUES ($1, $2, $3) RETURNING *`,
      [name, quadrant, capacity]
    );
    return new Venue(rows[0]);
  }

  static async updateById(id, attrs) {
    const venue = await Venue.getById(id);
    if (!venue) return null;
    const { name, quadrant, capacity } = { ...venue, ...attrs };
    const { rows } = await pool.query(
      `UPDATE venues
      SET name=$2, quadrant=$3, capacity=$4
      WHERE id=$1 RETURNING *`,
      [id, name, quadrant, capacity]
    );
    return new Venue(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM venues WHERE id=$1 RETURNING *',
      [id]
    );
    return new Venue(rows[0]);
  }
}

module.exports = { Venue };
