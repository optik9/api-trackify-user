import pool from '../config/db.js';

const timeSheetModel = {
  async getByUserId(userId) {
    const [rows] = await pool.query(`
      SELECT 
        users.id As id_user,
        users.name AS user_name, 
        projects.name AS project_name, 
        ts.description,
        ts.time_from,
        ts.time_to,
        ts.duration,
        ts.createdAt,
        CASE
          WHEN TRIM(users.phone) REGEXP '^(\\\\+51|0051)' THEN 'Peru'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+59|0059)' THEN 'Peru'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+977|00977)' THEN 'Nepal'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+1|001)' THEN 'USA'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+63|0063)' THEN 'USA'
          ELSE 'Other'
        END AS location
      FROM time_sheets ts
      JOIN users ON ts.user_id = users.id
      JOIN projects ON ts.project_id = projects.id
      WHERE users.id = ?`, [userId]);
      
    return rows;
  },

  async getAllUsersData(filters = {}) {
    let baseQuery = `
      SELECT 
        users.id AS id_user,
        users.name AS user_name,
        users.status AS status,
        
    
        CASE
          WHEN TRIM(users.phone) REGEXP '^(\\\\+51|0051)' THEN 'Peru'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+59|0059)' THEN 'Peru'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+977|00977)' THEN 'Nepal'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+1|001)' THEN 'USA'
          WHEN TRIM(users.phone) REGEXP '^(\\\\+63|0063)' THEN 'USA'
          ELSE 'Other'
        END AS location
      FROM users
     
    `;

   

    const queryParams = [];
    const whereClauses = [];

    // Filtro por status
    if (filters.status) {
      whereClauses.push('users.status = ?');
      queryParams.push(filters.status);
    }

      // Filtro por location
      if (filters.location) {
        whereClauses.push('location = ?');
        queryParams.push(filters.location);
      }

    // Filtro por fecha
   // if (filters.startDate && filters.endDate) {
   //   whereClauses.push('DATE(ts.createdAt) BETWEEN ? AND ?');
   //   queryParams.push(filters.startDate, filters.endDate);
   // }

    // Construir query final
    if (whereClauses.length > 0) {
      baseQuery += ' WHERE ' + whereClauses.join(' AND ');
    }

    // Ordenamiento
    //baseQuery += ' ORDER BY ts.createdAt DESC';

    // Ejecutar consulta
    const [rows] = await pool.query(baseQuery, queryParams);
    return rows;
  }
};

export default timeSheetModel;