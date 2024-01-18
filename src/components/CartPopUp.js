import React from 'react'

import { useDispatch,useSelector } from 'react-redux'
import {setError,clearCart} from "../redux/cartSlice";

export default function CartPopUp() {
    
    const dispatch = useDispatch();
    const diffRestroErr = useSelector((store)=>store.cart.error);

    const skipRestro=()=>{
      dispatch(setError(false));
    }

    const addRestro=()=>{
      dispatch(clearCart());
      dispatch(setError(false));
    }

    // if(diffRestroErr===true){
    //   alert("diff")
    // }

  return (
    diffRestroErr && (
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-slate-50 shadow-lg mb-8 p-4 w-1/3">

        <h1 className='text-2xl font-bold '>Items already in cart</h1>
        <div>
          <p className='my-2 mb-4'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
        </div>
        <button className='border-green-600 border-solid border-2 text-green-600 text-2xl px-4 py-1 mx-2' onClick={skipRestro} >No Skip this One</button>
        <button className='bg-green-600 text-white text-2xl px-6 py-2' onClick={addRestro}>Yes Start a Fresh</button>
      </div>
    )
  )
}
