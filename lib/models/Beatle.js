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

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM beatles WHERE beatles.id=$1', [id]
    );
    const data = rows[0];
    return data;
  }

  static async insert({ name, instrument, hand }) {
    const { rows } = await pool.query(
      'INSERT INTO beatles (name, instrument, hand) VALUES ($1, $2, $3) RETURNING *', 
      [name, instrument, hand]
    );
    return new Beatle(rows[0]);
  }

  static async updateById(id, attrs) {
    const beatle = await Beatle.getById(id);
    if (!beatle) return null;
    const { name, instrument, hand } = { ...beatle, ...attrs };
    const { rows } = await pool.query(
      `UPDATE beatles
      SET name=$2, instrument=$3, hand=$4
      WHERE id=$1 RETURNING *`,
      [id, name, instrument, hand]
    );
    return new Beatle(rows[0]);
  }
}

module.exports = { Beatle };
