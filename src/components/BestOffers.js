import React, { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constant";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function BestOffers() {
  const [offers, setoffers] = useState([]);
  const [foods,setFoods] = useState([]);

  useEffect(() => {
    getBestOffers();
    getfoodOptions();
  }, []);

  const getBestOffers = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.446591&lng=77.06595279999999"
      );
      const json = await response.json();

      // console.log("json ",json)

      const ofer = json?.data?.cards[0]?.card?.card?.imageGridCards?.info;

      setoffers(ofer);
    } catch (err) {
      console.log("error occured in fetching the data ", err);
    }
  };

  const getfoodOptions=async()=>{
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.446591&lng=77.06595279999999"
      );
      const json = await response.json();

      const food = json?.data?.cards[1]?.card?.card?.imageGridCards?.info;

      setFoods(food);
    } catch (err) {
      console.log("error occured in fetching the data ", err);
    }
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };





  return offers.length===0 ? <h1>Loading...</h1> : (

    <div>
    {/* <div className="py-4">
      <h2 className='font-bold text-2xl my-1'>Best offers for you</h2>
      <div className="py-4">
      <Carousel responsive={responsive} swipeable={true} draggable={true}>
        {offers.map((data) => (
          <div key={data.id} className='px-2 cursor-pointer'>
            <img
              src={CDN_URL+ data.imageId}
              className="rounded-3xl"
              alt={`Image ${data.id}`}
            />
          </div>
        ))}
      </Carousel>
        </div>
    </div> */}

    <div>
      <h1 className='font-bold text-2xl my-1 mx-4'>What's on your mind ?</h1>

      <div className="overflow-x-auto scrollbar-hi scroll">
        <div className="flex items-center">
          {offers.map((item, index) => (
            <div key={index}>
              <img src={CDN_URL+item.imageId} className="w-4- h-auto"/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
