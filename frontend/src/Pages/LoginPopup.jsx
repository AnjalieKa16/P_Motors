import React, { useContext,useState } from 'react'
import './LoginPopup.css'
import { assets } from '../assets/assets'
import  {StoreContext}  from "../Components/Context/StoreContext";
import axios from 'axios';


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const[currState,setCurrState] =useState("Login")
    const[data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault();

        let newUrl = url;
        if (currState==="Login"){
            newUrl += "/api/users/login";
        }
        else{
            newUrl += "/api/users/register";
        }

        const response = await axios.post(newUrl,data); 

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);  // help to store the token in local storage
            alert("Login Successful");
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }
    /*
    useEffect(()=>{
        console.log(data);
    },[data])
    */

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}  alt="" className='cross-icon'></img>
            </div>

            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required></input>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required></input>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required></input>
            </div>

            <button type='submit' className='login-popup-button'>
                {currState==="Sign Up"?"Create account":"Login"}</button>
                <div className='login-popup-conditions'>
                    <input type='checkbox' required></input>
                    <p>I agree to the <span>Terms and Conditions</span></p>
                </div>

                {currState==="Login"
                ?<p> create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span> </p>
                :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span> </p>}

                
                

        </form>

    </div>
  )
}

export default LoginPopup