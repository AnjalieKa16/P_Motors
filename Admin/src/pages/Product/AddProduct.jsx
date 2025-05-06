import React ,{useEffect, useState} from 'react'
import './AddProduct.css'
import { assets } from '../../assets/assets' 
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {

    const url = "http://localhost:4000" ;
    const[image, setImage] = useState(false);
    const[data,setData] = useState({
        product_id:"",
        name: "",
        description: "",
        category_id: "",
        brand_id: "",
        warranty_id: "",
        purchase_price: "",
        selling_price: ""
    })

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [warranties, setWarranties] = useState([]);

    const fetchOptions = async () => {
        try {
            const [catRes, brandRes, warrantyRes] = await Promise.all([
                axios.get(`${url}/api/categories/list`),
                axios.get(`${url}/api/brands/list`),
                axios.get(`${url}/api/warranties/list`)
            ]);

            setCategories(catRes.data.data);
            setBrands(brandRes.data.data);
            setWarranties(warrantyRes.data.data);
        } catch (error) {
            console.error("Error fetching select options", error);
            toast.error("Failed to load dropdown options");
        }
    };

    useEffect(() => {
        fetchOptions();
        return () => {
            if (image) {
              URL.revokeObjectURL(image);
            }
          };
    }, [image]);



    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data=> ({...data, [name]: value}))  
    }

    const onFileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPEG, PNG, and GIF files are allowed");
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
          }
          setImage(file);
        }
      };


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error("Please upload an image");
            return;
          }

        if (!data.product_id || !data.name || !data.description || !data.category_id || 
            !data.brand_id || !data.warranty_id || !data.purchase_price || !data.selling_price) {
          toast.error("Please fill in all required fields");
          return;
        }

        const formData = new FormData();
        formData.append("product_id", data.product_id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append('brand_id', data.brand_id);
        formData.append('warranty_id', data.warranty_id);
        formData.append('purchase_price', Number(data.purchase_price));
        formData.append('selling_price', Number(data.selling_price));
        formData.append('image', image);

          // Debugging: Log the formData
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
          
        try {
            const response = await axios.post(`${url}/api/products/add`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

        if (response.data.success) {
            toast.success(response.data.message || "Product added successfully");
            setData({
                    product_id:"",
                    name: "",
                    description: "",
                    category_id: "",
                    brand_id: "",
                    warranty_id: "",
                    purchase_price: "",
                    selling_price: ""
            });
            setImage(false);
            
        } 
        else {
            toast.error(response.data.message);
           /* alert("Failed to add product");*/
            }

        }
        catch (error) {
            if (error.response) {
              console.error("Backend Error:", error.response.data);
              toast.error(error.response.data.message || "Failed to add product");
            } else if (error.request) {
              toast.error("No response from the server. Please try again later.");
            } else {
              toast.error("An error occurred: " + error.message);
            }
          }
}

        /*const result = await response.json();
        console.log(result);*/
    

    /*
    useEffect(()=>{

        console.log(data);
    },[data])
    */

  return (
    <div className='Add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-product-id flex-col'>
                    <p>Product ID</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.product_id} 
                        type='text' 
                        name='product_id' 
                        placeholder='Enter Product ID' 
                        required 
                    />
                </div>

                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <div className='upload-container'>
                        <img className='upload-icon' 
                        src={image ? URL.createObjectURL(image) : assets.upload} 
                        alt='upload' />
                        </div>
                    </label>
                    <input 
                    onChange={onFileChangeHandler} 
                    type='file'
                    id='image' hidden required />

                </div>

                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
                </div>

                <div className='add-product-description flex-col'>
                    <p>Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='4' placeholder='Type here' />
                </div>

                <div className='add-category flex-col'>
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} name='category_id' value={data.category_id} required>
                        <option value=''>Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                        ))}
                    </select>
                </div>

                <div className='add-brand flex-col'>
                    <p>Brand</p>
                    <select 
                        onChange={onChangeHandler} 
                        name='brand_id' 
                        value={data.brand_id} required>

                        <option value=''>Select Brand</option>
                        {brands.map(brand => (
                            <option key={brand.brand_id} value={brand.brand_id}>
                            {brand.brand_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='add-warranty flex-col'>
                    <p>Warranty</p>
                    <select onChange={onChangeHandler} name='warranty_id' value={data.warranty_id} required>
                        <option value=''>Select Warranty</option>
                        {warranties.map(w => (
                            <option key={w.warranty_id} value={w.warranty_id}>{w.name}</option>
                        ))}
                    </select>
                </div>

                <div className='add-price-section flex'>
                    <div className='add-price flex-col'>
                        <p>Purchase Price</p>
                        <input onChange={onChangeHandler} value={data.purchase_price} type='number' name='purchase_price' placeholder='Type here' />
                    </div>
                    <div className='add-price flex-col'>
                        <p>Selling Price</p>
                        <input onChange={onChangeHandler} value={data.selling_price} type='number' name='selling_price' placeholder='Type here' />
                    </div>
                </div>

                <div classsName='add-button-container flex'>
                <button type='submit' 
                    className='add-button'>ADD</button>
                </div>

            </form>
        </div>
  )
}

export default AddProduct