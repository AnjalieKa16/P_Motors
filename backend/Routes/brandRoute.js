// Routes/brandRouter.js
import express from 'express';
import { getAllBrands } from '../controllers/brandController.js';

const brandRouter = express.Router();

brandRouter.get('/list', getAllBrands);

export default brandRouter;
