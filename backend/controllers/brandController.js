// controllers/brandController.js
import pool from '../config/db.js';

export const getAllBrands = (req, res) => {
  const sql = 'SELECT brand_id, brand_name FROM brand';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error fetching brands' });
    res.status(200).json({ success: true, data: results });
  });
};
