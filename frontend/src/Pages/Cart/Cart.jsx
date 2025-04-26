import React, { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, getTotalPrice } = useContext(StoreContext);
  const navigate = useNavigate();

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
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
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>Price: Rs. {item.price}</p>
            <div className="cart-quantity-controls">
              <button onClick={() => decreaseQuantity(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item._id)}>+</button>
            </div>
            <p>Subtotal: Rs. {item.price * item.quantity}</p>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <p><strong>Subtotal:</strong> Rs. {totalPrice}</p>
        <p><strong>Delivery Charges:</strong> Rs. {totalPrice === 0 ? 0 : deliveryCharge}</p>
        <h3><strong>Total:</strong> Rs. {totalPrice === 0 ? 0 : totalPrice + deliveryCharge}</h3>
        <button  onClick={() => navigate('/order')}className="checkout-btn">PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;