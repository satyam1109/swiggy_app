import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import Shimmer from "./Shimmer";

import { CDN_URL } from "../utils/constant";
import TotalPrice from "./TotalPrice";

export default function Cart() {
  const resInfo = useSelector((store) => store.cart.resDetails);
  const cartItems = useSelector((store) => store.cart.items);
  const cartNumber = useSelector((store) => {
    const items = store.cart.items;
    return Object.values(items).reduce((total, item) => total + (item.quantity || 0), 0);
  })

  // subscribing to store.
  
  const { name, cloudinaryImageId, areaName } = resInfo?.info || {};


  return cartNumber===0 ? ( <Shimmer/> ): (
    <div className="bg-gray-100 pt-8">
      <div className="flex flex-col sm:flex-row">

        <div className="w-1/7 flex flex-col border border-blue-500 my-2">
          <h1 className="font-bold text-3xl py-4">SECURE CHECKOUT</h1>

          <div className="flex flex-row py-4">
            <div className="w-1/6">
              <img src={CDN_URL + cloudinaryImageId} className="rounded-md" />
            </div>

            <div className="flex flex-col mx-8">
              <h1 className="font-bold text-xl">{name ? name.toUpperCase(): name}</h1>
              <h1 className="font-serif">{areaName}</h1>
            </div>
            
          </div>

          <div className="py-10 px-3">
            <CartItems data={cartItems} />
          </div>
          

        </div>


        <div className="lg:w-1/3 md:w-1/3 mx-6 my-2">
          <TotalPrice/>
        </div>
      </div>
      
    </div>
  );
}
