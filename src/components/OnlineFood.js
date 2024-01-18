import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Shimmer from "./Shimmer";
import RestroCard from "./RestroCard";
import { Link } from "react-router-dom";

export default function OnlineFood() {

  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("");
  const [page, setPage] = useState(10);
  const [hasmore, setHasMore] = useState(true);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurants] = useState([]);
  
  const [activeFilters, setActiveFilters] = useState({
    delivery:false,
    rating: false,
    veg: false,
    priceUnder300: false,
    price300to600: false,
  });

  useEffect(() => {

    getCityName();
    getMoreRestro();
    
  }, []);

  async function getCityName() {
    try {
      const response = await fetch(
        "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.446591%26lng%3D77.06595279999999"
      );
      const json = await response.json();

      const city=json?.data?.cards[3]?.card?.card?.title;

      setCityName(city || "city");
    } catch (err) {
      console.log("Got error in fetching the city data", err);
    }
  }

  async function getMoreRestro() {
    try {
      const response = await fetch(
        // "https://corsproxy.org/?https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fupdate",
        "https://www.swiggy.com/dapi/restaurants/list/update",

        {
          method: "POST", // Use POST for fetching more restaurants
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers here
          },
          body: JSON.stringify({
            lat: 28.446591,
            lng: 77.06595279999999,
            nextOffset: "COVCELQ4KIDA67eDofjaCzCnEzgE", // Use the correct nextOffset value
            // Other payload parameters if needed
            seoParams: {
              apiName: "FoodHomePage",
              pageType: "FOOD_HOMEPAGE",
              seoUrl: "https://www.swiggy.com/",
            },
            widgetOffset: {
              // Include your widgetOffset values here
              NewListingView_Topical_Fullbleed: "",
              NewListingView_category_bar_chicletranking_TwoRows: "",
              NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
              collectionV5RestaurantListWidget_SimRestoRelevance_food_seo:
              String(10),
            },
          }),
        }
      );
      const data = await response.json();

      let newRestaurants =
        data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;

      if (newRestaurants.length > 0) {

        setAllRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...newRestaurants,
        ]);

        setFilteredRestaurants((prevRestaurants)=>[
          ...prevRestaurants,
          ...newRestaurants,
        ]);
      }

      if (newRestaurants.length < 15) {
        setHasMore(false);
      }

      console.log(allRestaurants);
    } catch (error) {
      console.error("Error fetching more restaurants:", error);
    } finally {
      // setHasMore(false);
    }
  }

  const applyFilters = () => {
    let filteredProducts = [...allRestaurants];

    if (activeFilters.rating) {
      filteredProducts = filteredProducts.filter(product => product.info.avgRating >= 4);
    }

    if (activeFilters.veg) {
      filteredProducts = filteredProducts.filter(product => product.info.veg);
    }

    if (activeFilters.priceUnder300) {
      filteredProducts = filteredProducts.filter(product => product.price < 300);
    }

    if (activeFilters.price300to600) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= 300 && product.price <= 600
      );
    }

    if (activeFilters.delivery) {
      filteredProducts = filteredProducts.filter(product => product.info.sla.deliveryTime < 20);
    }
    
    

    // Update the products state with the filtered list
    setFilteredRestaurants(filteredProducts);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: !prevFilters[filterType],
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [activeFilters]);

  return (
    <div>
      <div>
        <h1 className="font-serif font-bold text-2xl ml-4 my-2">{cityName}</h1>
      </div>
 
      <div>
        <div className="my-6 ml-4">

          <button onClick={() => handleFilterClick('delivery')} className={`${activeFilters.delivery ? 'bg-slate-200' : ''} border border-gray-400 rounded-2xl px-2 py-1 mx-2`}>Fast Delivery</button>

          <button onClick={() => handleFilterClick('rating')} className={`${activeFilters.rating ? 'bg-slate-200' : ''} border border-gray-400 rounded-2xl px-2 py-1 mx-2`}>Ratings 4.0+</button>

          <button onClick={() => handleFilterClick('veg')} className={`${activeFilters.veg ? 'bg-slate-200' : ''} border border-gray-400 rounded-2xl px-2 py-1 mx-2`}>Pure Veg</button>
        </div>
      </div>

      <div>
        <InfiniteScroll
          dataLength={allRestaurants.length}
          next={getMoreRestro}
          hasMore={hasmore}
          loader={<Shimmer />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div>
            <div className="mx-4">
              <div className="flex flex-wrap items-center">
                {filteredRestaurant.map((item, index) => (
                  <Link to={`home/${item?.info?.id}`} key={index}>
                    <div className="flex-shrink-0 py-2 mx-4">
                      <RestroCard restInfo={item?.info} width={64} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </InfiniteScroll>
        ;
      </div>
    </div>
  );
}
