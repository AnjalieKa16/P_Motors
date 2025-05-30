import React, { useContext, useState,useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Components/Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token}=useContext(StoreContext);
    const[data,setData]=useState([]);

    const fetchOrders = async()=>{
        const response =await axios.post(url+"/api/order/userorders",{},{headers:{ Authorization: `Bearer ${token}` }});
        setData(response.data.orders);   // since backend res.json({ success: true, orders });
        //console.log(response.data.orders);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]
    )

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
            {data.map((order,index)=>{
                return(
                    <div key={index} className='my-orders-order'>
                    {/*<img src={assets.bag_shopping} alt='orders'></img>*/}
                    <p>
                        {Array.isArray(order.items)
                        ? order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                        return item.name + "x" + item.quantity;
                        } else {
                        return item.name + "x" + item.quantity + " ,";
                        }
                          })
                        : "No items"}
                    </p>

                    <p>Rs. {order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Trach Order</button>



                    </div>
                )
            })}
        </div>
    
    </div>
  )
}

export default MyOrders