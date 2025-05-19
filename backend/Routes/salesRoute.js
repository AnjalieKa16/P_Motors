// routes/salesRoute.js
import express from 'express';
import { handlePhysicalSale } from '../controllers/salesController.js';

const salesRouter = express.Router();

// POST route for physical sale
salesRouter.post('/physical-sale', handlePhysicalSale);

export default salesRouter;
