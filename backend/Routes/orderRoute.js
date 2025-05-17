// routes/orderRoute.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder,getOrder,verifyOrder,userOrders} from '../controllers/orderController.js';

const orderRouter = express.Router();

// POST /orders  --> place a new order
orderRouter.post("/place",authMiddleware, placeOrder);

// GET /orders/:orderId  --> get order details by orderId
orderRouter.get('/:orderId', getOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)

export default orderRouter;
