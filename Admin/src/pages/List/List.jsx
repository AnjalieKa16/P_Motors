import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
 // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/products/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Server error while fetching products");
    }
  };

  const removeProduct = async (product_id) => {
    try {
      const response = await axios.post(`${url}/api/products/remove`, { product_id });
      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList(); // Refresh the list after successful deletion
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Server error while removing product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="liss add flex-col">
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Product ID</b>
          <b>Name</b>
          <b>Image</b>
          <b>Brand</b>
          <b>Category</b>
          <b>Warranty</b>
          <b>Purchase Price</b>
          <b>Selling Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <p>{item.product_id}</p>
            <p>{item.name}</p>
            <img
              src={`${url}/uploads/${item.image}`}
              alt={item.name}
              className="product-image"
            />
            <p>{item.brand_id}</p>
            <p>{item.category_id}</p>
            <p>{item.warranty_id}</p>
            <p>Rs {item.purchase_price}</p>
            <p>Rs {item.selling_price}</p>
            <p onClick={()=>removeProduct(item.product_id)} className="cursor">x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
