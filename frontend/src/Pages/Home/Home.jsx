import React from 'react'
import { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreCategory from '../../Components/ExploreCategoryList/ExploreCategory'
import ItemDisplay from '../../Components/ItemDisplay/ItemDisplay'
import Footer from '../../Components/Footer/Footer'



const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div className="home-container">
    <Header/>
    <ExploreCategory category={category} setCategory={setCategory}/>
    <ItemDisplay category={category}/>
    
    </div>
  )
}

export default Home