import orderModel from '../Models/orderModel.js';
import userModel from '../Models/userModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const userId = req.user.id; // get from auth middleware
    const {items, amount, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required.' });
    }

    // 1. Create the order in MySQL
    const result = await orderModel.createOrder(
      {
        user_id: userId,
        amount,
        address,
        status: 'pending',
        payment: false
      },
      items
    );
    const orderId = result.orderId;

    // 2. Clear the user's cart
    await userModel.updateCartData(userId, {});

    // 3. Prepare Stripe line_items
    
const line_items = items.map((item) => {
  let price = Number(item.selling_price ?? item.price ?? 0);
  if (isNaN(price) || price <= 0) {
    throw new Error(`Invalid price for item: ${item.name}`);
  }
  return {
    price_data: {
      currency: "LKR",
      product_data: { name: item.name },
      unit_amount: Math.round(price * 100),
    },
    quantity: item.quantity,
  };
});


    // Add delivery charge as a line item
    line_items.push({
      price_data: {
        currency: "LKR",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200 * 100, // Rs. 200 delivery charge
      },
      quantity: 1,
    });

    // 4. Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`,
    });

    res.status(201).json({
      message: 'Order placed successfully.',
      orderId,
      session_url: session.url,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order.', error: error.message });
  }
};

// Optionally, get order details
const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.getOrderById(orderId);
    if (!order.order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order.', error: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === true || success === "true") {
      await orderModel.updateOrderStatus(orderId, { payment: true });
      res.json({
        message: 'Paid',
        success: true
      });
    } else {
      await orderModel.deleteOrderById(orderId);
      res.json({
        message: 'Not Paid',
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to verify order.', error: error.message });
  }
}

// users orders for frontend

// Example for userOrders controller
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.getOrdersByUserId(userId);

    // For each order, fetch its items
    for (const order of orders) {
      order.items = await orderModel.getOrderItemsByOrderId(order.order_id);
    }

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user orders', error: error.message });
  }
};

export {
  placeOrder,
  getOrder,
  verifyOrder,
  userOrders
};