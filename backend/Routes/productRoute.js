// productRouter.js
import express from 'express';
import multer from 'multer';
import { addProductController,getProductController, removeProductController } from '../controllers/productController.js';

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

// API route to get the list of products
productRouter.get('/list',getProductController);

// API route to remove a product
productRouter.post('/remove', removeProductController);


export default productRouter;
