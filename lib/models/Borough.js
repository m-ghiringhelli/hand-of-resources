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

  static async insert({ name, population, county }) {
    const { rows } = await pool.query(
      'INSERT INTO boroughs (name, population, county) VALUES ($1, $2, $3) RETURNING *',
      [name, population, county]
    );
    return new Borough(rows[0]);
  }

  static async updateById(id, attrs) {
    const borough = await Borough.getById(id);
    if(!borough) return null;
    const { name, population, county } = { ...borough, ...attrs };
    const { rows } = await pool.query(
      `UPDATE boroughs
      SET name=$2, population=$3, county=$4
      WHERE id=$1 RETURNING *`,
      [id, name, population, county]
    );
    return new Borough(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM boroughs WHERE id=$1 RETURNING *',
      [id]
    );
    return new Borough(rows[0]);
  }
}

module.exports = { Borough };
