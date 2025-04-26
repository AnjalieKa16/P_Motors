// productController.js
import { addProduct } from '../Models/productModel.js';
import fs from 'fs';
import db from '../config/db.js';

// Add Product Controller
const addProductController = (req, res) => {
    let image_filename = `${req.file.filename}`;

    const productData = {
        product_id: req.body.product_id,
        name: req.body.name,
        brand: req.body.brand,
        purchase_price: req.body.purchase_price,
        selling_price: req.body.selling_price,
        category_id: req.body.category_id,
        warranty_id: req.body.warranty_id,
        image: image_filename
    };

    addProduct(productData, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: "Error adding product" });
        } else {
            res.json({ success: true, message: "Product Added" });
        }
    });
};


const getProductController = (req, res) => {
    try {
        const sql = 'SELECT * FROM product';
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Error fetching products" });
            } else {
                res.json({ success: true, data: results });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { addProductController, getProductController };
