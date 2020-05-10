const db = require("../db");

class Company {

  static async getAll({ search = "", min_employees = 0, max_employees = 10000 }) {
    const searchTerm = `%${search}%`;
    console.log(searchTerm);
    if (min_employees > max_employees) {
      throw new ExpressError("Max employees must be greater than min employees", 400);
    };

    const results = await db.query(
      `SELECT 
        handle,
        name,
        num_employees,
        description,
        logo_url
        FROM companies
        WHERE 
        name ILIKE $1 AND
        num_employees <= $2 AND
        num_employees >= $3`,
      [searchTerm, min_employees, max_employees]
    );

    return results.rows;
  };

  static async create({ handle, name, num_employees, description, logo_url }) {
    const result = await db.query(
      `INSERT INTO companies (
        handle,
        name,
        num_employees,
        description,
        logo_url)
        VALUES ($1, $2, $3, $4, $5)`,
      [handle, name, num_employees, description, logo_url]
    );
    return result.rows[0];
  };

  static async get(handle) {
    const result = await db.query(
      `SELECT 
        handle, 
        name,
        num_employees,
        description,
        logo_url
        FROM companies 
        WHERE handle = $1`,
      [handle]
    );

    if (result.row.length === 0) {
      throw new ExpressError("Company Handle Not Found", 404);
    }

    return result.rows[0];
  };

  static async update(handle, data) {
    const { query, values } = sqlForPartialUpdate('companies', data, "handle", handle);
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      throw new ExpressError("Handle does not match any companies", 404);
    }
    return result.rows[0];
  };

  static async delete(handle) {
    const result = await db.query(
      `DELETE FROM companies 
        WHERE handle = $1`,
      [handle]
    );

    if (result.row.length === 0) {
      throw new ExpressError("Company Handle Not Found", 404);
    }

    return result.rows[0];
  };

};

module.exports = Company;