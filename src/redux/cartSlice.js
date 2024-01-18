import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:{},
        resDetails:null,
        error:false,
        locationPopup:false,
    },

    reducers:{

        setResDetails : (state,action)=>{

          state.resDetails=action.payload;

        },
        // addItem : (state,action)=>{
        //     state.items.push(action.payload);
        // },
        addItem: (state, action) => {

            const newItem = action.payload;
            console.log("item added is : ",newItem);
            const itemId = newItem.card.info.id;


            if (state.items[itemId]) {
              // If the item already exists in the cart, increment quantity
              state.items[itemId].quantity += 1;
            } else {
              // Otherwise, add the new item to the cart with a quantity of 1
              state.items[itemId] = { ...newItem, quantity: 1 };
            }
        },
       
        removeItem: (state, action) => {
            const itemId = action.payload.card.info.id;
      
            if (state.items[itemId]) {
              const item = state.items[itemId];
      
              if (item.quantity === 1) {
                // If quantity is 1, remove the item from the cart
                delete state.items[itemId];
              } else {
                // Otherwise, decrement the quantity
                item.quantity -= 1;
              }
            }
        },

        clearCart : (state)=>{
            state.items={};
            state.resDetails=null;
        },
        setError(state,action){
          state.error=action.payload;
        },
        setLocationPopup(state,action){
          state.locationPopup=action.payload;
        }

    }
})

export const {setResDetails,addItem,removeItem,clearCart,setError,setLocationPopup}= cartSlice.actions;
export default cartSlice.reducer;