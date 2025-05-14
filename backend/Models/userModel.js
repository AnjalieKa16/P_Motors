import db from '../config/db.js'; // Adjust path as needed

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // returns the user object if found, or undefined
};

// Create (register) a new user
const createUser = async ({ name, email, password, cartData = {} }) => {
  const [result] = await db.query(
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
  createUser
};
