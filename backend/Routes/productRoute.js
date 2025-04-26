// productRouter.js
import express from 'express';
import multer from 'multer';
import { addProductController,getProductController } from '../controllers/productController.js';

const productRouter = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // store in uploads/ folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


// API route to add a product
productRouter.post('/add', upload.single('image'), addProductController);

productRouter.get('/list',getProductController);

export default productRouter;
