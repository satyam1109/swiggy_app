import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../redux/CoordSlice";
import { setLocationPopup } from "../redux/cartSlice";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineLocationSearching } from "react-icons/md";

// import useLiveCoord from "../utils/useLiveCoord";

export default function Location() {
  const dispatch = useDispatch();
  const locatePopup = useSelector((store) => store.cart.locationPopup);

  const [searchedLocation, setSearchedLocation] = useState("");
  const [placeid, setPlaceid] = useState("");
  const [places, setPlaces] = useState([]);

  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");
  const [city, setcity] = useState("chaura");

  useEffect(() => {
    getLocation();
  }, [searchedLocation]);

  useEffect(() => {
    if (placeid !== "") {
      fetchCoordinates();
    }
  }, [placeid]);

  useEffect(() => {
    if (lat || lng) {
      dispatch(setCoordinates({ latitude: lat, longitude: lng, City: city }));
    }
  }, [lat, lng]);

  const getLocation = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchedLocation}`
      );
      const json = await response.json();

      setPlaces(json?.data);
    } catch (err) {
      console.log("failed to eftch the data ", err);
    }
  };

  const fetchCoordinates = async () => {
    const coord = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`
    );
    const coordJson = await coord.json();

    // console.log("lat ",coordJson?.data[0]?.geometry?.location?.lat)
    // console.log("lng ",coordJson?.data[0]?.geometry?.location?.lng)

    setlat(coordJson?.data[0]?.geometry?.location?.lat);
    setlng(coordJson?.data[0]?.geometry?.location?.lng);
  };

  const handlePlaceClick = (item) => {
    console.log("Item selected is:", item);
    setPlaceid(item?.place_id);
    setcity(item?.description);
    dispatch(setLocationPopup(false));
  };

  const getCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6cc59105af6c444fa4bd8d8ff360e5e5`
      );
      const data = await response.json();

      // Extract city name from the response

      const sub = data?.results[0]?.components?.suburb || "";
      const cityName =
        data.results[0]?.components?.city ||
        data.results[0]?.components?.town ||
        data.results[0]?.components?.village;

      const comp_name = `${sub}, ${cityName}`;

      return comp_name;
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  const getLiveGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log({ latitude, longitude });
          setlat(latitude);
          setlng(longitude);
          dispatch(setLocationPopup(false));

          // dispatch(setCoordinates({ lat, lng }));

          let cityname = await getCityName(latitude, longitude);

          setcity(cityname);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  return (
    locatePopup && (
      <div className="w-1/3 fixed left-0 top-0 h-full bg-white shadow-2xl p-4 z-10">
        <button
          onClick={() => {
            dispatch(setLocationPopup(false));
          }}
          className="my-4"
        >
          <RxCross1 size="1.5rem" className="w-6 h-6"/>
        </button>
        <input
          className="w-full border border-gray-300 rounded px-3 py-3 mb-2 shadow-md my-2"
          type="text"
          name=""
          placeholder="Search for area, street name.."
          value={searchedLocation}
          key="input-text"
          onChange={(e) => setSearchedLocation(e.target.value)}
        />

        <div
          className="bg-gray-100  px-4 py-6 rounded flex flex-row cursor-pointer border-2 hover:text-orange-600 mt-6"
          onClick={() => getLiveGeolocation()}
        >
          <MdOutlineLocationSearching className="w-6 h-6"/>

          <p className="mx-2 font-semibold ">
            Get Current Location
          </p>
        </div>

        {places && places.length > 0 && (
          <div className="my-4">
            {places.map((item) => (
              <div
                key={item.place_id}
                onClick={() => handlePlaceClick(item)}
                className="font-semibold cursor-pointer px-2 py-4 border-b-4 hover:text-orange-600"
              >
                {item.description}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
