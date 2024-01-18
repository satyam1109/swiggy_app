// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from './cartSlice';

// const store = configureStore({
//     reducer:{
//         cart:cartReducer,
//     },
// });

// export default store;

// appStore.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import coordReducer from "./CoordSlice";
import foodName from "./foodname";


const rootReducer = combineReducers({
  cart: cartReducer,
  coord: coordReducer,
  food:foodName,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
 
