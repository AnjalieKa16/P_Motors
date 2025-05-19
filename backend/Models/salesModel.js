// models/salesModel.js
import pool from '../config/db.js';

export const findOrCreateCustomer = async (phone_number) => {
  const [existing] = await pool.query('SELECT * FROM customers WHERE phone_number = ?', [phone_number]);
  if (existing.length > 0) return existing[0].customer_id;

  const [result] = await pool.query('INSERT INTO customers (phone_number) VALUES (?)', [phone_number]);
  return result.insertId;
};

/*
export const createSale = async (customer_id, employee_id, total_amount) => {
  const [result] = await pool.query(
    'INSERT INTO sales (customer_id, employee_id, total_amount) VALUES (?, ?, ?)',
    [customer_id, employee_id, total_amount]
  );
  return result.insertId;
};

export const insertSaleItems = async (sale_id, items) => {
  const values = items.map(item => [sale_id, item.product_id, item.quantity, item.selling_price]);
  await pool.query(
    'INSERT INTO sales_items (sale_id, product_id, quantity, selling_price) VALUES ?',
    [values]
  );
};*/

// models/salesModel.js


export const createSale = async (customer_id, employee_id, total_amount) => {
  const [result] = await db.execute(
    'INSERT INTO sales (customer_id, employee_id, total_amount) VALUES (?, ?, ?)',
    [customer_id, employee_id, total_amount]
  );
  return result.insertId;
};

export const createSaleItems = async (sale_id, items) => {
  const values = items.map(item => [sale_id, item.product_id, item.quantity, item.selling_price]);
  await db.query(
    'INSERT INTO sale_items (sale_id, product_id, quantity, selling_price) VALUES ?',
    [values]
  );
};

