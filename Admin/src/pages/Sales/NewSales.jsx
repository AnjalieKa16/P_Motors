import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../../Components/Context/StoreContext";


const NewSales = () => {
  const { cartItems, getTotalPrice, removeFromCart, setCartItems } = useContext(StoreContext);
  const [employeeId, setEmployeeId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSale = async () => {
    if (!employeeId || cartItems.length === 0) {
      setMessage('Please provide employee ID and add at least one item.');
      return;
    }

    const saleData = {
      customer_id: customerId || null, // optional for walk-in customer
      employee_id: employeeId,
      total_amount: getTotalPrice(),
      cartItems: cartItems.map(item => ({
        product_id: item._id,
        quantity: item.quantity,
        selling_price: item.price,
      }))
    };

    try {
      setIsLoading(true);
      const res = await axios.post('/api/sales/physical-sale', saleData);
      setMessage(`✅ Sale successful. Sale ID: ${res.data.sale_id}`);
      setCartItems([]); // clear cart after sale
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to complete sale. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">🛒 New Physical Sale</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Employee ID *</label>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Employee ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Customer ID (optional)</label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Customer ID (or leave blank)"
          />
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">🧾 Cart Summary</h4>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map(item => (
                <li key={item._id} className="flex justify-between border-b pb-1">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 ml-2"
                  >
                    ❌
                  </button>
                </li>
              ))}
              <li className="font-bold flex justify-between pt-2">
                <span>Total:</span>
                <span>Rs. {getTotalPrice().toFixed(2)}</span>
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={handleSale}
          disabled={isLoading || cartItems.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isLoading ? 'Processing...' : '✅ Complete Sale'}
        </button>

        {message && (
          <div className="mt-3 text-sm font-medium text-blue-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewSales;
