// Routes/warrantyRouter.js
import express from 'express';
import { getAllWarranties } from '../controllers/warrantyController.js';

const warrantyRouter = express.Router();

warrantyRouter.get('/list', getAllWarranties);

export default warrantyRouter;
