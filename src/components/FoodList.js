import React , {useContext} from "react";
import { CDN_URL } from "../utils/constant";
import nonvegicon from "../utils/non-veg.png";

import { setResDetails,addItem,removeItem ,setError} from "../redux/cartSlice";
import { useDispatch,useSelector } from "react-redux";
import CartPopUp from "./CartPopUp";

export default function FoodList({data,restroInfo}) {


  const fooditems = data;

  const dispatch=useDispatch();

  const rescartinfo = useSelector((store) => store.cart.resDetails);


  const handleAddItem=(item)=>{

    console.log("item is ",item);
    console.log("restro info is ",restroInfo);

    if(rescartinfo===null){
      dispatch(setResDetails(restroInfo));
      dispatch(addItem(item));
    }
    else{
      if(rescartinfo.info.id!==restroInfo.info.id){
        dispatch(setError(true));
      }
      else{
        dispatch(addItem(item));
      }
    }

    
  }

  return (
    <>
    <CartPopUp/>
    <div>
      {fooditems.map((item, index) => (
        <div
          key={index}
          className="border-gray-300 border-b-2 flex flex-row justify-between my-2 px-4"
        >
          <div className="w-9/12 mb-4">

            <h1>{item?.card?.info?.isVeg===1
            ? <img className="w-5" src="https://www.shutterstock.com/image-illustration/pure-veg-icon-logo-symbol-260nw-2356551911.jpg"/>
            : <img className="w-5" src={nonvegicon}/>}
            </h1>
            <h1 className="font-semibold my-1 text-lg">
              {item?.card?.info?.name}
            </h1>

            <p className=" font-mono">
              ₹{""}
              {item?.card?.info?.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </p>

            <p className="text-gray-600 my-1 text-sm">
              {item?.card?.info?.description}
            </p>
          </div>
          <div className="w-2/12 p-4 pl-0 mb-6">
            <img
              src={CDN_URL + item.card.info.imageId}
              className="rounded-md shadow-md w-40"
            />
            <div className="w-full flex justify-center items-center pb-4">
              <button className="p-1 lg:p-2 bg-white mx-10 shadow-lg absolute text-green-500 font-semibold px-2 md:px-4 lg:px-8 rounded-lg hover:bg-gray-100"

              onClick={()=>handleAddItem(item)}
              
              >
                <p className="text-xs md:text-sm lg:text-lg">ADD</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    </>
  );
}
