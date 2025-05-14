// controllers/categoryController.js
/*import pool from '../config/db.js';

export const getAllCategories = (req, res) => {
  const sql = 'SELECT category_id, category_name FROM category';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error fetching categories' });
    res.status(200).json({ success: true, data: results });
  });
};*/

import pool from '../config/db.js';

export const getAllCategories = async (req, res) => {
  const sql = 'SELECT category_id, category_name FROM category';
  try {
    const [results] = await pool.query(sql);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching categories' });
  }
};

