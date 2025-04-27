// productModel.js
import pool from '../config/db.js'; // assume you have db.js for connection

// Add Product
export const addProduct = (data, callback) => {
    const sql = `INSERT INTO product 
    (product_id, name, brand, purchase_price, selling_price, category_id, warranty_id, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    pool.query(sql, [
        data.product_id,
        data.name,
        data.brand,
        data.purchase_price,
        data.selling_price,
        data.category_id,
        data.warranty_id,
        data.image 
    ], callback);
};
