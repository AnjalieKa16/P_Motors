// models/orderModel.js
import pool from '../config/db.js';

const createOrder = async (orderData, items) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, amount, address, status, payment)
       VALUES (?, ?, ?, ?, ?)`,
      [
        orderData.user_id,
        orderData.amount,
        JSON.stringify(orderData.address),
        orderData.status || 'pending',
        orderData.payment || false
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity)
         VALUES (?, ?, ?)`,
        [orderId, item.product_id, item.quantity]
      );
    }

    await connection.commit();
    return { success: true, orderId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getOrderById = async (orderId) => {
  const [order] = await pool.query(
    `SELECT * FROM orders WHERE order_id = ?`,
    [orderId]
  );

  const [items] = await pool.query(
    `SELECT oi.*, p.name, p.selling_price 
     FROM order_items oi 
     JOIN products p ON oi.product_id = p.product_id 
     WHERE oi.order_id = ?`,
    [orderId]
  );
  return {
    order: order[0],
    items
  };
};


//  To get orders details by users  id
const getOrdersByUserId = async (userId) => {
  const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
  return orders;
};


// Update order status or payment
export const updateOrderStatus = async (orderId, updateFields) => {
  // updateFields should be an object, e.g. { payment: true } or { status: 'Paid' }
  const setClause = Object.keys(updateFields)
    .map(field => `${field} = ?`)
    .join(', ');
  const values = Object.values(updateFields);
  values.push(orderId);

  await pool.query(
    `UPDATE orders SET ${setClause} WHERE order_id = ?`,
    values
  );
};

const deleteOrderById = async (orderId) => {
  await pool.query('DELETE FROM orders WHERE order_id = ?', [orderId]);
};

const getOrderItemsByOrderId = async (orderId) => {
  const [items] = await pool.query(
    `SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ?`,
    [orderId]
  );
  return items;
};

export default {
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrderById,
  getOrdersByUserId,
  getOrderItemsByOrderId
};
