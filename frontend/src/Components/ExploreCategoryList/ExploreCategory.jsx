import React from 'react';
import './ExploreCategory.css';
import { category_list } from '../../assets/assets';

const ExploreCategory = ({ category, setCategory }) => {
 //console.log('Category List:', category_list); // Debugging: Log the category list

  return (
    <div className='exploreCategory' id='exploreCategory'>
      <h1>Explore Categories</h1>
      <br></br>
      
      <div className='explore_categoryList'>
        {category_list.map((item, index) => {
          //console.log('Category Item:', item); // Debugging: Log each category item
          return (
            <div 
              key={index}
              className={`category ${category === item.category_name ? 'selected-category' : ''}`}
              onClick={() => setCategory(prev => prev === item.category_name ? "All" : item.category_name)} 
                // for filtering spare parts based on category and show when click on category
            >
              <img
                className={category === item.category_name ? 'active' : ''}
                src={item.category_image}
                alt={item.category_name}
              />
              <p>{item.category_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreCategory;