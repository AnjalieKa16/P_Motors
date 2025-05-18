import React ,{useContext,useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from "../../Components/Context/StoreContext";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalPrice,token,spare_parts_list,cartItems,url } = useContext(StoreContext);

  const[data,setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '' 
  })

  const onChangeHandler = (e) => {
    const  name  = e.target.name;
    const value = e.target.value; 
    setData({
      ...data,
      [name]: value
    })
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    let order_items = [];
    for (const item of spare_parts_list) {
  const id = item.product_id || item.id;
  const quantity = cartItems.find(ci => ci.product_id === id)?.quantity || 0;
  if (quantity > 0) {
    let price = Number(item.selling_price ?? item.price ?? 0);
    if (isNaN(price) || price <= 0) {
      alert(`Invalid price for item: ${item.name}`);
      return; // This will exit placeOrder
    }
    let itemInfo = { ...item, quantity, selling_price: price };
    order_items.push(itemInfo);
  }
}
    

    
      // console.log(order_items);
      let orderData = {
        address:data,
        items: order_items,
        amount: getTotalPrice() + deliveryCharge,
      }

      let response = await axios.post(url+"/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` }});
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
    }
    else{
      alert("Failed to place order");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
  if (!token || getTotalPrice() === 0) {
    navigate('/cart');
  }
}, [token, getTotalPrice, navigate]);

  
  const totalPrice = getTotalPrice(); // Call the function
  const deliveryCharge = 200;
  const totalWithDelivery = totalPrice + deliveryCharge;

  return (
    <form onSubmit={placeOrder} className='place-order-form'>
      <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className='multi-fields'>
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name'></input>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name'></input>
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email Address'></input>
          <input required name='street' onChange={onChangeHandler} value={data.street}type='text' placeholder='Street'></input>
            
            <div>
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'></input>
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'></input>
            </div>
          <div className='multi-fields'>
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type='text' placeholder='Zip Code'></input>
          <input required name='country' onChange={onChangeHandler} value={data.country}type='text' placeholder='Country'></input>
          </div>

          <input required name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} type='text' placeholder='Phone Number'></input>
      </div>

      <div className='place-order-right'>
      <p className='title'>Cart Total</p>
        <div className="place-order-summary">
          <div className='summary-row'>
              <p><strong>Subtotal:</strong></p>
              <p>Rs. {totalPrice}</p>
          </div>
  
        <div className='summary-row'>
             <p><strong>Delivery Charges:</strong></p>
             <p>Rs. {totalPrice === 0 ? 0 : deliveryCharge}</p>
        </div>

        <h3><strong>Total:</strong>Rs. {totalPrice === 0 ? 0 : totalPrice + deliveryCharge}</h3>
        <button type='submit'>PROCEED TO PAYMENT</button>
      </div>


      </div>
    </form>
  )
}

export default PlaceOrder