import React, { useState } from "react";
import FoodList from "./FoodList";

export default function FoodCategoryAccordian({data,restroInfo}) {


  const { title, itemCards } = data;

  const [showItems,setshowItems]=useState(true);
  
  let icon = "null";

  {
    showItems ? icon = "M4.5 15.75l7.5-7.5 7.5 7.5" : icon = "M19.5 8.25l-7.5 7.5-7.5-7.5";
  }

  const handleVisibility = () => {
    setshowItems(!showItems);
  };



  return (
    <div>
      <div className="flex flex-col bg-gray-100 shadow-2xl my-4 border-1 rounded-lg hover:shadow-xl">
        <div
          className="mx-auto  p-4 flex justify-between w-full cursor-pointer"
          onClick={handleVisibility}
        >
          <span className="font-bold text-lg">
            {title} ({itemCards.length})
          </span>
          <span>
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={icon}
                />
              </svg>
            }
          </span>
        </div>

        <div>
          <div>{showItems && <FoodList data={itemCards} restroInfo={restroInfo} />}</div>
        </div>
      </div>
    </div>
  );
}
