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

/*
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [spare_parts_list, setSparePartsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  // Fetch spare parts
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

  // Fetch categories
  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(url + "/api/categories/list");
      setCategoryList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Fetch cart from backend and merge with product info
  const fetchCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const cartObj = response.data.cartData || {};
        const cartArr = Object.entries(cartObj).map(([product_id, quantity]) => {
          const product = spare_parts_list.find(p => p.product_id === product_id);
          return product ? { ...product, quantity } : null;
        }).filter(Boolean);
        setCartItems(cartArr);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Add to cart (frontend and backend)
  const addToCart = async (product) => {
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

    if (token) {
      await axios.post(url + "/api/cart/add",
        { product_id: product.product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartData();
    }
  };

  // Remove from cart (frontend and backend)
  const removeFromCart = async (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartData();
    }
  };

  // Update quantity in backend and sync
  const updateCartItemQuantity = async (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );

    if (token) {
      await axios.post(
        url + "/api/cart/update",
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartData();
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.selling_price * item.quantity,
      0
    );
  };

  // Initial load: products, categories, token
  useEffect(() => {
    async function loadData() {
      await fetchSparePartList();
      await fetchCategoryList();
      const tokenFromStorage = localStorage.getItem('token');
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
      }
    }
    loadData();
  }, []);

  // Fetch cart when both token and products are loaded
  useEffect(() => {
    if (token && spare_parts_list.length > 0) {
      fetchCartData();
    }
    // eslint-disable-next-line
  }, [token, spare_parts_list]);

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
    updateCartItemQuantity,
    fetchCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

*/

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [spare_parts_list, setSparePartsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:4000";

   const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch spare parts
  const fetchSparePartList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "/api/products/list");
      if (response.data.success) {
        setSparePartsList(response.data.data);
      } else {
        setError("Failed to fetch spare parts: " + response.data.message);
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(url + "/api/categories/list");
      setCategoryList(response.data.data || []);
    } catch (error) {
      setError("Error fetching categories: " + error.message);
    }
  };

  // Fetch cart from backend and merge with product info
  const fetchCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const cartObj = response.data.cartData || {};
        const cartArr = Object.entries(cartObj).map(([product_id, quantity]) => {
          const product = spare_parts_list.find(p => String(p.product_id) === String(product_id));
          return product ? { ...product, quantity } : null;
        }).filter(Boolean);
        setCartItems(cartArr);
      }
    } catch (error) {
      setError("Error fetching cart data: " + error.message);
    }
  };

  // Add to cart (frontend and backend)
  const addToCart = async (product) => {
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

    if (token) {
      try {
        await axios.post(url + "/api/cart/add",
          { product_id: product.product_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCartData();
      } catch (error) {
        setError("Error adding to cart: " + error.message);
      }
    }
  };

  // Remove from cart (frontend and backend)
  const removeFromCart = async (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { product_id: productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCartData();
      } catch (error) {
        setError("Error removing from cart: " + error.message);
      }
    }
  };

  // Update quantity in backend and sync
  const updateCartItemQuantity = async (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/update",
          { product_id: productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCartData();
      } catch (error) {
        setError("Error updating cart quantity: " + error.message);
      }
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.selling_price || 0) * item.quantity,
      0
    );
  };

  // Initial load: products, categories, token
  useEffect(() => {
    async function loadData() {
      await fetchSparePartList();
      await fetchCategoryList();
      const tokenFromStorage = localStorage.getItem('token');
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
      }
    }
    loadData();
  }, []);

  // Fetch cart when both token and products are loaded
  useEffect(() => {
    if (token && spare_parts_list.length > 0) {
      fetchCartData();
    }
    // eslint-disable-next-line
  }, [token, spare_parts_list]);

    // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

   // Example: Call this after login or profile update
  const fetchUserProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  // Optionally, fetch user profile on mount if token exists
  useEffect(() => {
    if (token && !user) {
      fetchUserProfile();
    }
    // eslint-disable-next-line
  }, [token]);


  useEffect(() => {
  fetch(`${url}/api/admin/profile`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(data => {
      if (data.name) {
        setAdminName(data.name);
        toast.success("Admin profile loaded");
      }
    })
    .catch(err => {
      console.error(err);
      toast.error("Failed to load admin profile");
    });
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
    updateCartItemQuantity,
    fetchCartData,
    loading,
    error,
    user,
    setUser,
    fetchUserProfile,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;