// productController.js
import { addProduct } from '../Models/productModel.js';
import fs from 'fs';
import path from 'path';
import pool from '../config/db.js';

// Add Product Controller (unchanged if it uses addProduct internally with async)
const addProductController = async (req, res) => {
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
        image: image_filename
    };

    if (!productData.product_id || !productData.name || !productData.brand_id || 
        !productData.category_id || !productData.warranty_id || 
        !productData.purchase_price || !productData.selling_price || 
        !productData.description) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        await addProduct(productData);  // ensure this function uses async/await inside
        res.status(200).json({ success: true, message: "Product Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
};

// Get Product List Controller
const getProductController = async (req, res) => {
    const sql = 'SELECT * FROM products';

    try {
        const [results] = await pool.query(sql);
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

// Remove Product Controller
const removeProductController = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    try {
        const [results] = await pool.query('SELECT image FROM products WHERE product_id = ?', [product_id]);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const imagePath = results[0].image;

        await pool.query('DELETE FROM products WHERE product_id = ?', [product_id]);

        if (imagePath) {
            const fullPath = path.join(process.cwd(), 'uploads', imagePath);
            fs.access(fullPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error('Failed to delete image file:', err.message);
                        }
                    });
                }
            });
        }

        res.status(200).json({ success: true, message: 'Product Removed' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete product', error: err.message });
    }
};

export { addProductController, getProductController, removeProductController };
