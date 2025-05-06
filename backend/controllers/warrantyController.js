// controllers/warrantyController.js
import pool from '../config/db.js';

export const getAllWarranties = (req, res) => {
  const sql = 'SELECT warranty_id, name FROM warranty_types';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error fetching warranties' });
    res.status(200).json({ success: true, data: results });
  });
};
