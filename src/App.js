import "./App.css";
import TopRestros from "./components/TopRestros.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.js";
import Home from "./components/Home";
import Cart from "./components/Cart.js";
import RestroMenu from "./components/RestroMenu";
import OnlineFood from "./components/OnlineFood";
import Shimmer from "./components/Shimmer";
import Practise from "./components/Practise";
import appStore from "./redux/appStore.js";

import { Provider } from "react-redux";
import BestOffers from "./components/BestOffers.js";

import Location from "./components/Location"
import SearchFood from "./components/SearchFood.js";
import SearchedFood from "./components/Practise";

function App() {
 

  return (

    // <OnlineFood/>
    // <BestOffers/>

    // <TopRestros/>

    // <Practise/>

      <Provider store={appStore}>
        <Location/>
        <NavBar/>
        <div className="App mx-1 lg:mx-40 md:mx-16">
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="home/:resId" element={<RestroMenu />} />
              <Route path="/search_food" element={<SearchFood/>}/>
              <Route path="/search/:food" element={<SearchedFood/>}/>
            </Routes>
          
        </div>

      </Provider>

  );
}

export default App;
