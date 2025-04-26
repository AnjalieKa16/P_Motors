import React, { useContext } from 'react'
import './SparePartItem.css'
import { StoreContext } from '../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const SparePartItem = ({id, name, price, description, image}) => {
    const { cartItems, addToCart, removeFromCart, spare_parts_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = () => {
        // Find product details from spare_parts_list (you must have _id in list)
        const product = spare_parts_list.find(item => item._id === id);
        if (product) {
            addToCart(product);
            console.log("Navigating to /cart...");
            navigate('/cart'); // navigate to cart after adding
        }
    };

    const handleCartIconClick = () => {
        navigate('/cart');
    };

    return (
        <div className='Spare-part-item'>
            <div className='Spare-part-image-container'>
                <img className='Spare-part-image' src={image} alt='' />
            </div>

            <div className='item-information'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="rating" />
            </div>

            <div className='item-information2'>
                <p className='spare-part-price'>Rs. {price}</p>
                <span onClick={handleMoreClick} style={{ cursor: 'pointer', color: 'blue' }}>
                    More
                </span>
            </div>

            <div className="add-to-cart-btn">
                <button className="btn" onClick={handleAddToCart}>
                    <img
                        src={assets.shopping_cart}
                        alt="Shopping Cart"
                        width="20"
                        height="20"
                    />
                </button>
            </div>
        </div>
    )
}

export default SparePartItem;
