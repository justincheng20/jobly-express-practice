class Company {

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
      `SELECT FROM companies (
        handle, 
        name,
        num_employees,
        description,
        logo_url
        WHERE handle = $1)`,
      [handle]
    );
    
    if (result.row.length === 0){
      throw new ExpressError("Company Handle Not Found", 404);
    }

    return result;
  };

  static async update(){

  };

  static async delete(handle){
    const result = await db.query(
      `DELETE FROM companies (
        WHERE handle = $1)`,
        [handle]
    );

    if (result.row.length === 0){
      throw new ExpressError("Company Handle Not Found", 404);
    }

    return result;
  };

};