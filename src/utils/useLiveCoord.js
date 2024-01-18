import React from "react";
import { useGeolocated } from "react-geolocated";

const useLiveCoord = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

        if(coords){
            return {latitude: coords.latitude,longitude:coords.longitude}
        }
        else{
            return null;
        }
}



export default useLiveCoord;