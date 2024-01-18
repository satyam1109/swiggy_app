import React from "react";
import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SearchFood() {

  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);

  const [searchFood, setSearchFood] = useState("");

  useEffect(() => {
    getfoodlist();
  }, [searchFood]);

  const getfoodlist = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=31.252145&lng=75.70301&str=${searchFood}`
    );
    const data = await response.json();

    setFoods(data?.data?.suggestions);
  };

  const handleFoodClick = (food)=>{
    const encodedFood = encodeURIComponent(food);
    navigate(`/search/${encodedFood}`);
  }

  return (
    <div className="mx-32">
      <div className="flex justify-center">
        <input
          className="w-full border border-gray-300 rounded px-6 py-3 mb-2 shadow-md my-2"
          type="text"
          name=""
          placeholder="Search for restaurants and food"
          value={searchFood}
          key="input-text"
          onChange={(e) => setSearchFood(e.target.value)}
        />
      </div>

      {foods && foods.length > 0 && ( 
        <div>
          { foods.map((item, index) => (
            <div
              key={index}
              className="flex flex-row  hover:bg-blue-50 cursor-pointer py-4"
              onClick={()=>handleFoodClick(item?.text)}
            >
              <div className="w-24">
                <img
                  src={CDN_URL + item?.cloudinaryId}
                  className="rounded-md"
                />
              </div>

              <div className="mx-6" onCl>
                <h1 className="text-md font-semibold">{item?.text}</h1>
                <h1 className="text-md">{item?.tagToDisplay}</h1>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div>
  );
}
