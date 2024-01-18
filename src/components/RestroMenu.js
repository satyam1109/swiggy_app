import React ,{useState}from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer.js";

import useMenuData from "../utils/useMenuData.js";
import FoodCategoryAccordian from "./FoodCategoryAccordian.js";

export default function RestroMenu() {
  
  const { resId } = useParams();
 
  const menuData = useMenuData(resId);
  console.log("menuData ",menuData);
 

  if (menuData === null) return <Shimmer />;

  const restroInfo=menuData?.cards[0]?.card?.card;


  const {
    name,
    areaName,
    city,
    cuisines,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
  } = menuData?.cards[2]?.card?.card?.info;

  const offers = menuData?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers;

  console.log("offers ",offers);

  // only those food categories will be selected that have @type = " type.googleapis.com/swiggy.presentation.food.v2.ItemCategory "
  // this will allow us to better iterate ove rsimilar types of object in the array .

  const categories = menuData?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (cat) => cat.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
 
  console.log("categories ",categories);

  return (
    <div className="mx-10">

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-serif font-bold text-2xl">{name}</h1>
          <p className="overflow-hidden">{cuisines.join(", ")}</p>
          <p>{areaName}, {city}</p>
        </div>
        <div className="flex flex-col border-4 border-solid rounded-lg p-2">
            <h1 className="font-serif font-bold text-2xl text-green-600 mb-2">⭐ {avgRatingString}</h1>
            <hr className="border-t-2 border-gray-500"></hr>
            <h1 className="font-bold text-xl text-gray-500">{totalRatingsString}</h1>
        </div>
      </div>

      <div className="separator h-1 bg-gray-400 w-full my-4"></div>

      <div className="flex flex-col">
        <div className="font-serif font-bold text-xl">{costForTwoMessage}</div>
        <div className="flex flex-wrap">
            {
                offers.map((item,index)=> (
                    <div className="border-2 rounded-md mx-2 my-2" key={index}>
                        <div className="px-2 py-1">
                        <h1 className="font-bold text-sm text-gray-700">{item.info.header}</h1>
                        <h1 className="font-bold text-xs text-gray-500">{item.info.couponCode} | {item.info.description}</h1>
                        </div>
                    </div>
                ))

            }
        </div>
      </div>

      <div className="separator h-1 bg-gray-400 w-full my-6"></div>

      {
        categories.map((cat,index)=>(

          // controlled component : "FoodCategoryAccordian" component is controlled by the parent component 

          <div key={index}>
            <FoodCategoryAccordian 
            data={cat?.card?.card} 
            restroInfo={restroInfo}
            />
          </div>
        ))
      }

    </div>
  );
}
