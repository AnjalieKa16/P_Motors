import React ,{useContext} from 'react'
import './PlaceOrder.css'
import { StoreContext } from "../../Components/Context/StoreContext";

const PlaceOrder = () => {

  const {getTotalPrice } = useContext(StoreContext);

  const totalPrice = getTotalPrice(); // Call the function
  const deliveryCharge = 200;
  const totalWithDelivery = totalPrice + deliveryCharge;

  return (
    <form className='place-order-form'>
      <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className='multi-fields'>
            <input type='text' placeholder='First Name'></input>
            <input type='text' placeholder='Last Name'></input>
          </div>
          <input type='email' placeholder='Email Address'></input>
          <input type='text' placeholder='Street'></input>
            
            <div>
          <input type='text' placeholder='City'></input>
          <input type='text' placeholder='State'></input>
            </div>
          <div className='multi-fields'>
          <input type='text' placeholder='Zip Code'></input>
          <input type='text' placeholder='Country'></input>
          </div>

          <input type='text' placeholder='Phone Number'></input>
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
        <button>PROCEED TO PAYMENT</button>
      </div>


      </div>
    </form>
  )
}

export default PlaceOrder