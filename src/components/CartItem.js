import React from "react";
import nonvegicon from "../utils/non-veg.png";

import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";

export default function CartItem({ details, quantity, item }) {
  console.log("Details ", details);

  const { id, name, isVeg, defaultPrice, price } = details?.info;

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(addItem(item));
  };

  const handleDecrement = () => {
    dispatch(removeItem(item));
  };

  return (
    <div>

      <div className="flex flex-row my-4 items-center">
        <span className="pr-8">
          {isVeg === 1 ? (
            <img
              className="w-5"
              src="https://www.shutterstock.com/image-illustration/pure-veg-icon-logo-symbol-260nw-2356551911.jpg"
            />
          ) : (
            <img className="w-5" src={nonvegicon} />
          )}
        </span>

        <span className="pr-8 font-serif">{name}</span>

        <div className="flex flex-row w-1/3 ml-auto">
          <div className="-mt-2 flex justify-between border h-10 w-20 border-slate-300 p-1 text-green-500 mr-8 ">
            <button className="pl-1" onClick={handleDecrement}>
              -
            </button>
            <div className="">{quantity}</div>
            <button className="pr-1" onClick={handleIncrement}>
              +
            </button>
          </div>

          <span>
            ₹{" "}
            {price ? (price / 100) * quantity : ( defaultPrice / 100) * quantity}
          </span>
        </div>
      </div>

      
    </div>
  );
}
