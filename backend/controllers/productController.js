// productController.js
import { addProduct } from '../Models/productModel.js';
import fs from 'fs';
import db from '../config/db.js';
import path from 'path';

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

// Get Product List Controller
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

// Remove Product Controller
const removeProductController = (req, res) => {
    const productId = req.body.product_id;

    const sqlSelect = "SELECT image FROM product WHERE product_id = ?";
    db.query(sqlSelect, [productId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error finding product" });
        }

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const imageFileName = result[0].image;

        if (imageFileName) {
            const imagePath = `uploads/${imageFileName}`;

            fs.unlink(imagePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting image file:', unlinkErr);
                    // (optional) You can still continue to delete product
                }
            });
        }

        const sqlDelete = "DELETE FROM product WHERE product_id = ?";
        db.query(sqlDelete, [productId], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error(deleteErr);
                return res.status(500).json({ success: false, message: "Error deleting product" });
            }

            res.json({ success: true, message: "Product Removed" });
        });
    });
};


export { addProductController, getProductController, removeProductController };
