import React from 'react'
import CartItem from './CartItem';

export default function CartItems({data}) {

    const cartProducts=Object.values(data);

  return (

    <div>

      {
        cartProducts.map((item,index)=>(
          <div key={index}>
            <CartItem details={item.card} quantity={item.quantity} item={item}/>
          </div>
        ))
      }

    </div>
  )
}
