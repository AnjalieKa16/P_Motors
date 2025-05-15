import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const { cartItems, setCartItems, getTotalPrice, url,updateCartItemQuantity,removeFromCart  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/cart"); // Call backend to get cart data
        if (response.data.success) {
          setCartItems(response.data.cartData); // Update cartItems state
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData(); // Call the function to fetch cart data on page load
  }, [setCartItems]);

   const increaseQuantity = (productId, currentQuantity) => {
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };
  const totalPrice = getTotalPrice(); // Call the function
  const deliveryCharge = 200;
  const totalWithDelivery = totalPrice + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven’t added anything to your cart yet.</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product_id} className="cart-item">
          <img
            src={url + "/uploads/" + item.image}
            alt={item.name}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>Price: Rs. {item.selling_price}</p>
            <div className="cart-quantity-controls">
              <button onClick={() => decreaseQuantity(item.product_id,item.quantity)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.product_id,item.quantity)}>+</button>
            </div>
            <p>Subtotal: Rs. {item.selling_price * item.quantity}</p>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.product_id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <p><strong>Subtotal:</strong> Rs. {totalPrice}</p>
        <p><strong>Delivery Charges:</strong> Rs. {totalPrice === 0 ? 0 : deliveryCharge}</p>
        <h3><strong>Total:</strong> Rs. {totalWithDelivery}</h3>
        <button onClick={() => navigate("/order")} className="checkout-btn">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
