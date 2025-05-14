//responsible for rendering a list of spare parts.


import React, { useContext, useState} from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../Context/StoreContext'
import SparePartItem from '../SparePartItem/SparePartItem'


const SparePartDisplay = ({category}) => {

    const {spare_parts_list} = useContext(StoreContext)
    const [visibleProducts,setVisibleProducts] = useState(4);
    
    const loadMoreProducts=()=>{
      setVisibleProducts(prevcount=> prevcount + 4 )
    }

  
  return (
    <div className='Spare_Part_Display' id='Spare_Part_Display'>
    <h2>Featured Products</h2>
        <div className='spare-parts-list-display'>
            {spare_parts_list.map((item, index) => {
                if (category === 'All' || category === item.category_name) {
                    return (
                      <SparePartItem
                        key={index}
                        id={item.product_id}
                        name={item.name}
                        selling_price={item.selling_price}
                        description={item.description}
                        image={item.image}
                        category_name={item.category_name}
                        brand_name={item.brand_name}
                      />
                    );
              }
        })}

        </div>
    </div>
  )
}

export default SparePartDisplay