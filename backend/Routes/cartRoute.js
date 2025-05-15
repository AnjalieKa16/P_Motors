import express from "express";
import { addToCart, getCart, removeFromCart,updateCartQuantity } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.get("/get",authMiddleware, getCart);
cartRouter.post("/update",authMiddleware, updateCartQuantity);



export default cartRouter;