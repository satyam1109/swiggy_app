import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLocationPopup } from "../redux/cartSlice";
import { IoSearchOutline } from "react-icons/io5";

import Home from "./Home";
import CartItem from "./CartItem";

export default function NavBar() {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => {
    const items = store.cart.items;
    return Object.values(items).reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  });

  const locatePopup = useSelector((store) => store.cart.locationPopup);

  const { latitude, longitude, City } = useSelector((store) => store.coord);

  const setLocationPopupValue = () => {
    dispatch(setLocationPopup(true));
  };

  return (
    <div className="my-4 shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-row lg:ml-40">
          <Link to="/">
            <img
              className="w-16 pb-2"
              src="https://play-lh.googleusercontent.com/4OOU73CI8knF4TByikeCEA1IOj3hb_AyXdV0Y2_XNikAoVan257QCO0ppXK9e3Z1ncY"
            />
          </Link>

          <span
            className="ml-4 mt-4 cursor-pointer"
            onClick={() => setLocationPopupValue()}
          >
            {City}
          </span>
        </div>

        <div className="flex flex-row mt-2 lg:mr-40">
          <Link className="flex flex-row hover:text-orange-500 mx-4" to="/search_food">
            <IoSearchOutline className="w-6 h-6" />
            <div>
              <p className="font-semibold text-md">Search</p>
            </div>
          </Link>
          <Link className="text-md font-semibold mx-4 hover:text-orange-500">
            Offers
          </Link>
          <Link className="text-md font-semibold mx-2 flex" to="/cart">
            <div className="mx-2 bg-green-500 px-2 h-7 hover:bg-orange-500">
              <span>{cartItems}</span>
            </div>
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
