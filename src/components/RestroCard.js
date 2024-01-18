import React from "react";
import { CDN_URL } from "../utils/constant";

export default function RestroCard({restInfo,width}) {

  const {
    name,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
    avgRatingString,
    sla,
    areaName,
    cuisines, 
  } = restInfo;

  let header=null;
  let subHeader=null;

  if(aggregatedDiscountInfoV3){
    header =aggregatedDiscountInfoV3?.header;
    subHeader=aggregatedDiscountInfoV3?.subHeader;
  }

  const dynamicClass=`flex flex-col my-2 w-${width}`;
  

  return (

    <div className="transition-transform transform hover:scale-95">
    <div className={dynamicClass}>
      <div className="relative rounded-extra w-58 h-auto overflow-hidden">
        <img
          src={CDN_URL + cloudinaryImageId}
          className="w-full h-full object-cover"
        />
        {aggregatedDiscountInfoV3 && <h2 className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black text-white text-center py-1 font-bold text-xl font-bold">
          {header} {subHeader}
        </h2>}

      </div>
      <div className="text-left ml-4 pr-4 overflow-hidden">
        <h1 className="font-serif font-bold text-lg py-1 overflow-x-hidden dot">{name}</h1>
        <h3 className="font-bold flex flex-row">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSagag53Q6slVw2yCtlHPjkNopQCPy3oLVoF_dxTIGP4-TKwfKzpQuf71pycdQB80SLMbk&usqp=CAU"
            className="w-5 h-5 mr-2 mt-1"
          />
          {avgRatingString} . {sla.slaString}
        </h3>
        <p className="overflow-hidden dot mt-2">
          {cuisines.length > 2
            ? cuisines.slice(0, 3).join(", ") + " ..."
            : cuisines.join(", ")}
        </p>
        <p>{areaName}</p>
      </div>
    </div>
    </div>
  );
}

