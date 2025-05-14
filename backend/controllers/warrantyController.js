import pool from '../config/db.js';

export const getAllWarranties = async (req, res) => {
  const sql = 'SELECT warranty_id, name FROM warranty_types';
  try {
    const [results] = await pool.query(sql);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching warranties' });
  }
};
