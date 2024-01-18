import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard';

export default function SearchedFood() {

    const [restroSearched,setRestroSearched] = useState([]);

    useEffect(()=>{
        getFoodInfo();
    },[]);

    const getFoodInfo = async()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=31.252145&lng=75.703009&str=Pizza&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=82a14590-9269-a2d9-1110-0b42941c593b&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%2250a7b6a13177e653720b2a1d53e02958%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D");
        const json  = await data.json();

        const restrosFood = json?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards.filter(
          (cat) => cat.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.Dish"
        );
        console.log(restrosFood);
        setRestroSearched(restrosFood);

    }

    

  return (
    <div>
      {
        restroSearched.map((item,index)=>(
            <FoodCard info={item?.card?.card?.info} restaurant={item?.card?.card?.restaurant?.info} key={index}/>
        ))
      }
    </div>
  )
}
