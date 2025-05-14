import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Components/Context/StoreContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const { spare_parts_list, categoryList, addToCart,url } = useContext(StoreContext); // Access context

  // Find the product by ID
  const product = spare_parts_list?.find((item) =>
  item.product_id === id || item._id === id
);

const categoryName = (categoryList && product)
  ? categoryList.find(cat => cat.category_id === product.category_id)?.category_name || 'Uncategorized'
  : 'Loading...';

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate("/cart"); // Navigate to the cart page
    }
  };

  // If the product is not found, display an error message
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-details-content">
        <img src={url + "/uploads/" + product.image} alt={product.name} className="product-image" />
        <div className="product-info-section">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-info">
            <strong>Price:</strong> Rs. {product.selling_price}
          </p>

          <p className="product-info">
            <strong>Stock:</strong> {product.stock}
          </p>
          
          <p className="product-info">
            <strong>Category:</strong> {categoryName}
          </p>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;