// productController.js
import { addProduct } from '../Models/productModel.js';
import fs from 'fs';
import path from 'path';
import pool from '../config/db.js'; // ✅ Using pool properly

// Add Product Controller
const addProductController = (req, res) => {
    // Handle image filename, if the file is uploaded
    const image_filename = req.file ? req.file.filename : null;

    const productData = {
        product_id: req.body.product_id,
        name: req.body.name,
        brand_id: req.body.brand_id,
        purchase_price: req.body.purchase_price,
        selling_price: req.body.selling_price,
        category_id: req.body.category_id,
        warranty_id: req.body.warranty_id,
        description: req.body.description,
        image: image_filename  // Save the filename of the uploaded image
    };

    // Ensure product_id is provided
    if (!productData.product_id || !productData.name || !productData.brand_id || 
        !productData.category_id || !productData.warranty_id || 
        !productData.purchase_price || !productData.selling_price || 
        !productData.description) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Add product to the database
    addProduct(productData, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error adding product" });
        }
        res.status(200).json({ success: true, message: "Product Added" });
    });
};

// Get Product List Controller
const getProductController = (req, res) => {
    const sql = 'SELECT * FROM products'; // ✅ Table name corrected

    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Error fetching products" });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// Remove Product Controller
const removeProductController = (req, res) => {
    const { product_id } = req.body; // ✅ product_id (your database column)

    // Ensure product_id is provided
    if (!product_id) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Step 1: Get the product image filename
    const getProductQuery = 'SELECT image FROM products WHERE product_id = ?';
    pool.query(getProductQuery, [product_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const imagePath = results[0].image;

        // Step 2: Delete the product from the database
        const deleteProductQuery = 'DELETE FROM products WHERE product_id = ?';
        pool.query(deleteProductQuery, [product_id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to delete product', error: err.message });
            }

            // Step 3: Delete the image file from the uploads directory if it exists
            if (imagePath) {
                const fullPath = path.join(process.cwd(), 'uploads', imagePath); // uploads/image.jpg
                fs.access(fullPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.error('Image file does not exist, nothing to delete.');
                    } else {
                        fs.unlink(fullPath, (err) => {
                            if (err) {
                                console.error('Failed to delete image file:', err.message);
                            }
                        });
                    }
                });
            }

            // Step 4: Send success response
            res.status(200).json({ success: true, message: 'Product Removed' });
        });
    });
};

export { addProductController, getProductController, removeProductController };
