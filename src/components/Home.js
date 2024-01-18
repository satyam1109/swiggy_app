import React, { useContext } from "react";
import TopRestros from "./TopRestros";
import OnlineFood from "./OnlineFood";
import BestOffers from "./BestOffers";

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        {/* <BestOffers /> */}
      </div>

      <div className="border-gray-300 border-b-2 border-t-2">
        <TopRestros />
      </div>
    </div>
  );
}
