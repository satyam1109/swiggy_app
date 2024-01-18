import React, { useEffect, useState } from "react";
import RestroCard from "./RestroCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";

export default function TopRestros() {

  const { latitude, longitude } = useSelector((state) => state.coord);
  // console.log("value in store :",{latitude,longitude});
  const [allRestro, setallRestro] = useState([]);
  const [city, setcity] = useState("");

  // const [latitude,setlat]=useState(28.4595);
  // const [longitude,setlng]=useState(77.0266);  

  useEffect(() => {
    getTopRestro();
  }, [latitude,longitude]);

  const getTopRestro = async () => {
    try {
      const response = await fetch(
        // `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}`
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}`
      );
      const json = await response.json();
      console.log("json top",json);

      const title=json?.data?.cards[0]?.card?.card?.title;
      setcity(title);
      const restroData = json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      console.log("restro data  ",restroData);
      setallRestro(restroData || []);
    } catch (error) {
      console.error("Error fetching data from Top restro:", error);
    }
  };

  // console.log("Restros ",allRestro);

  return allRestro.length === 0 ? (

    <Shimmer/>
  ) : (
    <div className="my-12">
      <h1 className="font-serif font-bold text-2xl ml-4 my-2">{city}</h1>
      <div className="overflow-x-auto scrollbar-hi scroll">
        <div className="flex items-center">
          {allRestro.map((item, index) => (
            <Link to={`home/${item?.info?.id}`} key={item?.info?.id}>
              <div className="flex-shrink-0 w-72 py-2 mx-4">
                <RestroCard restInfo={item?.info} width={72}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
