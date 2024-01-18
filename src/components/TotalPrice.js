import React from 'react'
import { useSelector } from "react-redux";

export default function TotalPrice() {

    const cartItems = useSelector((store) => store.cart.items);
    const cartProducts=Object.values(cartItems);

    const prices = cartProducts.map(item => item?.card?.info?.price*item.quantity || item?.card?.info?.defaultPrice*item.quantity);
    const totalPrice = prices.reduce((sum, price) => sum + price, 0);

    const partnerFee=19;
    const platformfee=2;
    const gst=20;
    const finalPrice=(totalPrice/100)+platformfee+partnerFee+gst;

  return (
    <div>

        <div className='flex flex-col border border-blue-500'>
            <h1 className='font-bold text-2xl'>Bill Details</h1>

            <div>
                <div className='flex justify-between mx-2 my-2'> 
                    <span>Item Total</span>
                    <span>₹{totalPrice/100}</span>
                </div>
                <div className='flex justify-between mx-2'>
                    <span>Delivery Partner Fee</span>
                    <span>₹{partnerFee}</span>
                </div>

                <hr className='border border-t-2 mx-4 my-4'></hr>

                <div className='flex justify-between mx-2 '>
                    <span>Platform Fee</span>
                    <span>₹{platformfee}</span>
                </div>
                <div className='flex justify-between mx-2 my-2'>
                    <span>GST & Restaurant Charges</span>
                    <span>₹{gst}</span>
                </div>

                <hr className='border-gray-700 border-t-4 mx-2 mt-6 mb-8'></hr>

                <div className='flex justify-between mx-2 my-2'>
                    <span className='font-semibold'>TO PAY </span>
                    <span>₹{finalPrice}</span>
                </div>

                <div className='py-8'>
                <button className='border-green-600 border-solid border-2 text-green-600 text-xl px-4 py-1 mx-4'>GO BACK</button>
                <button className='bg-green-600 text-white text-xl px-6 py-2'>CONFIRM ORDER</button>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}
