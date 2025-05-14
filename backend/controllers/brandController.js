import pool from '../config/db.js';

export const getAllBrands = async (req, res) => {
  const sql = 'SELECT brand_id, brand_name FROM brand';
  try {
    const [results] = await pool.query(sql);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching brands' });
  }
};
