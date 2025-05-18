import './Orders.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async(event,orderId)=>{
    //console.log(event,orderId)
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => {
          // Parse address if it's a string
          let address = order.address;
          if (typeof address === "string") {
            try {
              address = JSON.parse(address);
            } catch {
              address = {};
            }
          }
          return (
            <div key={index} className='order-item'>
              <img src={assets.bag_shopping} alt='' />
              <div>
                <p className='order-item-food'>
                  {Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map((item, idx) =>
                        idx === order.items.length - 1
                          ? `${item.name} x${item.quantity}`
                          : `${item.name} x${item.quantity}, `
                      )
                    : "No items"}
                </p>
                <p className='order-item-name'>
                  {(address?.firstName || "") + " " + (address?.lastName || "")}
                </p>
                <div className='order-item-address'>
                  <p>{(address?.street || "") + ","}</p>
                  <p>
                    {(address?.city || "") + ", " + (address?.state || "") + ", " +
                      (address?.country || "") + "," + (address?.zipCode || "")}
                  </p>
                </div>
                <p className='order-item-phone'>{address?.phoneNumber || ""}</p>
              </div>
              <p>Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
              <p>Rs {order.amount} </p>

              <select onChange={(event)=>statusHandler(event,order.order_id)} value={order.status}>
                <option value="Order Processing">Order Processing</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;