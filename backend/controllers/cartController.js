import userModel from "../Models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const userId = req.user.id;
    const { product_id } = req.body;

    const user = await userModel.findUserById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = user.cartData;
    if (typeof cartData === "string") {
    cartData = JSON.parse(cartData);
  } else if (typeof cartData !== "object" || cartData === null) {
  cartData = {};
  }


    cartData[product_id] = (cartData[product_id] || 0) + 1;

    await userModel.updateCartData(userId,cartData);

    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware
    const { product_id } = req.body;

    // Fetch user data from DB
    const userData = await userModel.findUserById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists and is an object
    let cartData = userData.cartData;
    if (typeof cartData === "string") {
      cartData = JSON.parse(cartData);
    } else if (typeof cartData !== "object" || cartData === null) {
      cartData = {};
    }

    if (!cartData[product_id]) {
      return res.status(400).json({ success: false, message: "Product not in cart" });
    }

    // Remove product from cart
    delete cartData[product_id];

    // Update cartData in the database (convert to string before saving)
    await userModel.updateCartData(userId, cartData);

    res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch current cart
/*const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware

    // Fetch user data from DB
    const userData = await userModel.findUserById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get cart data (default to empty object if none exists)
    const cartData = userData.cartData ? JSON.parse(userData.cartData) : {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};*/

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const user = await userModel.findUserById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = user.cartData;
    if (typeof cartData === "string") {
      cartData = JSON.parse(cartData);
    } else if (typeof cartData !== "object" || cartData === null) {
      cartData = {};
    }

    if (quantity > 0) {
      cartData[product_id] = quantity;
    } else {
      delete cartData[product_id];
    }

    await userModel.updateCartData(userId, cartData);

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const user = await userModel.findUserById(req.user.id);
    console.log("user:", user);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = user.cartData;
    if (typeof cartData === "string") {
      try {
        cartData = JSON.parse(cartData);
      } catch (e) {
        console.error("Failed to parse cartData:", user.cartData);
        cartData = {};
      }
    } else if (typeof cartData !== "object" || cartData === null) {
      cartData = {};
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, removeFromCart, getCart ,updateCartQuantity };
