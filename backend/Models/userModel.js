import pool from '../config/db.js'; // Adjust path as needed

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // returns the user object if found, or undefined
};

// Find user by ID
const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; // returns the user object if found, or undefined
};

// Update cart data for a user by ID
const updateCartData = async (id, cartData) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  if (rows.length === 0) {
    throw new Error(`User with ID ${id} not found`);
  }

  // Update the cartData column
  await pool.query('UPDATE users SET cartData = ? WHERE id = ?', [JSON.stringify(cartData), id]);
};

// Find user by ID and update cart data
const findByIdAndUpdate = async (id, cartData) => {
  await updateCartData(id, cartData); // Calls updateCartData method to update the cart
};

// Create (register) a new user
const createUser = async ({ name, email, password, cartData = {} }) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, cartData) VALUES (?, ?, ?, ?)',
    [name, email, password, JSON.stringify(cartData)]
  );

  return {
    id: result.insertId,
    name,
    email,
    cartData
  };
};

export default {
  findUserByEmail,
  findUserById,
  findByIdAndUpdate,
  createUser,
  updateCartData,  // Added this method to directly update cart data
};
