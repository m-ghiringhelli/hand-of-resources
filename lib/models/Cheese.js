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

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      'INSERT INTO cheeses (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Cheese(rows[0]);
  }

  static async updateById(id, attrs) {
    const cheese = await Cheese.getById(id);
    if (!cheese) return null;
    const { name, type } = { ...cheese, ...attrs };
    const { rows } = await pool.query(
      `UPDATE cheeses
      SET name=$2, type=$3
      WHERE id=$1 RETURNING *`,
      [id, name, type]
    );
    return new Cheese(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cheeses WHERE id=$1 RETURNING *',
      [id]
    );
    return new Cheese(rows[0]);
  };
}

module.exports = { Cheese };
