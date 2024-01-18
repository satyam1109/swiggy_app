import React from 'react'
import { CDN_URL } from "../utils/constant";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { setResDetails,addItem,removeItem ,setError} from "../redux/cartSlice";


export default function FoodCard({info,restaurant}) {

    const dispatch=useDispatch();
    
    const rescartinfo = useSelector((store) => store.cart.resDetails);

    const {defaultPrice,price, description, id , imageId,isVeg,name,ratings,ribbon} = info;
    const restroName = restaurant.name;
    const avgrating  = restaurant.avgRatingString;

    const handleAddItem=()=>{

        if(rescartinfo===null){
          dispatch(setResDetails(restaurant));
          dispatch(addItem(info));
        }
        else{
          if(rescartinfo.info.id!==restaurant.info.id){
            dispatch(setError(true));
          }
          else{
            dispatch(addItem(info));
          }
        }
    
        
      }
    

  return (
    <div className='w-1/2 rounded-2xl flex flex-col border-4'>

        <div>
            <p>By {restroName}</p>
            <span className='flex'><MdOutlineStarPurple500 size="1.2rem" className='mr-2 mt-1'/> {avgrating}</span>
        </div>

        <div className='flex flex-row pt-8'>

            <div className='w-7/12'>
                <span className='flex'>
                {isVeg ? <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/FC/HP/EV/74736417/plain-barcode-labels-250x250.jpeg" className='w-5 h-5'/> : <img src="https://www.nabeeats.com/assets/images/non-veg.png" className='w-5 h-5'/>}
                {ribbon.text ? <p className='text-orange-500 font-semibold mx-2'>{ribbon.text}</p> : ""}
                </span>

                <p className='text-2xl font-semibold'>{name}</p>
                <p className='txt-xl font-semibold'>₹ {price/100 || defaultPrice/100}</p>

                <p className='dot2'>{description}</p>
            </div>

            <div className='w-4/12'>
                <img src={CDN_URL+imageId} className='rounded-xl'/>
                <div className="w-full flex justify-center items-center pb-4">
              <button className="p-1 lg:p-2 bg-white mx-10 shadow-lg absolute text-green-500 font-semibold px-2 md:px-4 lg:px-8 rounded-lg hover:bg-gray-100"

              onClick={()=>handleAddItem()}
              
              >
                <p className="text-xs md:text-sm lg:text-lg">ADD</p>
              </button>
            </div>
            </div>

        </div>
      
    </div>
  )
}
