import React, { use, useContext,useEffect} from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Components/Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {

    const[searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate=useNavigate();

    //console.log(success,orderId);

    const verifyPayment =async()=>{
        const response =await axios.post(url + '/api/orders/verify',{success,orderId} )
        if(response.data.success){
            navigate('/myorders');
        }else{
            alert('Payment verification failed');
            navigate('/');
        }
    }

    useEffect(() => {
      verifyPayment();  
    },[])


    
  return (
    <div className='verify'>
    <div className='spinner'>
    </div>
  
    </div>
  )
}

export default Verify