// Routes/categoryRouter.js
import express from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/list', getAllCategories);

export default categoryRouter;
