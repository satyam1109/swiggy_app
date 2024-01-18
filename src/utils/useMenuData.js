import { useEffect,useState } from "react";


const useMenuData=(id)=>{

    const [data,setdata]=useState(null);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async()=>{
        try {
            const response = await fetch(
              `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`
            );
            const json = await response.json();
            const restroData =json?.data;
            setdata(restroData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    };
    return data;
}

export default useMenuData;