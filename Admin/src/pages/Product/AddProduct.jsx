import React ,{useEffect, useState} from 'react'
import './AddProduct.css'
import { assets } from '../../assets/assets' 
import axios from 'axios'

const AddProduct = () => {

    const url = "http://localhost:4000" ;
    const[image, setImage] = useState(false);
    const[data,setData] = useState({
        name: "",
        description: "",
        category: "",
        price: ""
    })

    const onChangehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data=> ({...data, [name]: value}))  
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', Number(data.price));

        const response = await axios.post(`${url}/api/products/Add`, formData);
        if (response.data.success) {
            alert("Product added successfully");
            setData({
                name: "",
                description: "",
                category: "",
                price: ""
            });
            setImage(false);
           
        } else {
            alert("Failed to add product");
        }

        const result = await response.json();
        console.log(result);
    }

    /*
    useEffect(()=>{

        console.log(data);
    },[data])
    */

  return (
    <div className='Add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img className='uploads' src={image?URL.createObjectURL(image):assets.upload} alt='upload'></img>
                </label>

                <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
            </div>

            <div className='add-product-name flex-col'>
                <p>Product Name</p>
                <input onChange={onChangehandler} value={data.name} type='text' name='name' placeholder='Type here '/>
            </div>

            <div className='add-product-description flex-col'>
                <p>Description</p>
                <textarea onChange={onChangehandler} value={data.description} name='description' rows='6' placeholder='Type here '></textarea>   
            </div>

            <div className='add-category-price'>
                <div className='add-category flex col'>
                    <p>Product Category</p>
                    <select onChange={onChangehandler} name='category'>
                        <option value=''>Select Category</option>
                        <option value='electronics'>Electronics</option>
                        <option value='clothing'>Clothing</option>
                        <option value='accessories'>Accessories</option>
                    </select>
                </div>

                <div className='add-price flex col'>
                    <p>Product Price</p>
                    <input onChange={onChangehandler} value={data.price} type='number' name='price' placeholder='Type here '/>
                    </div>
                </div>

            <button type='submit' className='add-button'>ADD</button>
        </form>
    </div>
  )
}

export default AddProduct