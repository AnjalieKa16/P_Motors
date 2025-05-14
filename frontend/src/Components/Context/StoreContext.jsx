/*import { createContext, useEffect, useState } from 'react';
//import { spare_parts_list } from '../../assets/assets'; // Adjust the path as necessary
import axios from 'axios';

export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const url ="http://localhost:4000";
  
  const [token, setToken] = useState("");

  const [spare_parts_list, setSparePartsList] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product_id === product.product_id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.selling_price * item.quantity,
      0
    );
  };

  const fetchSparePartList = async () => {
  try {
    const response = await axios.get(url + "/api/products/list");
    if (response.data.success) {
      setSparePartsList(response.data.data);
    } else {
      console.error("Failed to fetch spare parts:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  useEffect(() => {
    async function loadData() {
      await fetchSparePartList();
      if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

const [categoryList, setCategoryList] = useState([]);

axios.get(`${url}/api/categories/list`)
  .then((res) => setCategoryList(res.data.data)) // Adjust based on backend response structure
  .catch((err) => console.error("Error fetching categories", err));

  const contextValue = {
    spare_parts_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalPrice,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;*/

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [spare_parts_list, setSparePartsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product_id === product.product_id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.selling_price * item.quantity,
      0
    );
  };

  const fetchSparePartList = async () => {
    try {
      const response = await axios.get(url + "/api/products/list");
      if (response.data.success) {
        setSparePartsList(response.data.data);
      } else {
        console.error("Failed to fetch spare parts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchSparePartList();
        const categoryResponse = await axios.get(`${url}/api/categories/list`);
        setCategoryList(categoryResponse.data.data); // Adjust based on backend response structure

        const token = localStorage.getItem('token');
        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    spare_parts_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalPrice,
    url,
    token,
    setToken,
    categoryList,
    setCategoryList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
