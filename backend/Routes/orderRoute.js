// routes/orderRoute.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder,getOrder,verifyOrder,userOrders, listOrders,updateStatus} from '../controllers/orderController.js';
//import { updateOrderFields } from '../Models/orderModel.js';

const orderRouter = express.Router();

orderRouter.get('/test', (req, res) => res.send('Order router is working!'));
orderRouter.get("/list",listOrders)
// POST /orders  --> place a new order
orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.get('/:orderId', getOrder); // GET /orders/:orderId  --> get order details by orderId
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/status",updateStatus)




export default orderRouter;
