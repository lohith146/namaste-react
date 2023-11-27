import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { RestaurantDetailsShimmer } from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantDetails = () => {
  const { id } = useParams();
  const restDetails = useRestaurantDetails(id);
  if (restDetails === null) {
    return <RestaurantDetailsShimmer />;
  }
  const {
    name,
    areaName,
    avgRating,
    costForTwoMessage,
    cuisines,
    totalRatingsString,
    sla,
    aggregatedDiscountInfo,
  } = restDetails?.data?.cards[0]?.card?.card?.info;
  const menuDetails =
    restDetails?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const sortOnlyVeg = () => {};

  return (
    <div className="container mx-auto px-[240px] my-6">
      <div className="flex justify-between">
        <div>
          <h4 className="text-[18px] font-bold pb-1">{name}</h4>
          <p className="text-light text-slate-400 text-[12px]">
            {cuisines?.join(", ")}
          </p>
          <span className="text-light text-slate-400 text-[12px]">
            {areaName}, {sla?.lastMileTravelString}
          </span>
        </div>
        <div className="rating border-gray-300 border-solid border py-[8px] px-[8px] rounded-md text-center shadow-md">
          <p className="text-green-600 text-[12px] font-bold border-solid border-b bordergray-300 pb-2 tracking-[-0.25px]">
            <FontAwesomeIcon icon={faStar} className="mr-1" />
            {avgRating}
          </p>
          <span className="text-[9px] font-medium text-slate-500 align-sb tracking-[-0.75px]">
            {totalRatingsString}
          </span>
        </div>
      </div>
      {/* <div className="delivery-info">
        <div className="time">
          <span>{sla?.slaString}</span>
          <span>{costForTwoMessage}</span>
        </div>
        <div className="coupons">
          {aggregatedDiscountInfo?.descriptionList?.map((discount, i) => (
            <div key={i}>{discount?.meta}</div>
          ))}
        </div>
      </div> */}
      <div className="font-semibold py-4">
        <button onClick={sortOnlyVeg}>Veg Only</button>
      </div>
      <div className="menuItems">
        {menuDetails.map((item, i) => {
          return (
            <div key={i}>
              {item?.card?.card?.title && (
                <>
                  {
                    <Accordion
                      index={i}
                      title={item?.card?.card?.title}
                      content={item?.card?.card?.itemCards}
                    />
                    // <div className="menu-title" id={i}>
                    //   <h4
                    //     onClick={() => {
                    //       const listRef = document.getElementById(i);
                    //       console.log(listRef);
                    //       listRef.classList.toggle("active");
                    //     }}
                    //   >
                    //     <span
                    //       className={
                    //         item?.card?.card?.itemCards?.length ? "active" : ""
                    //       }
                    //     >
                    //       {item?.card?.card?.title}
                    //       {item?.card?.card?.itemCards?.length
                    //         ? ` (${item?.card?.card?.itemCards?.length})`
                    //         : ""}
                    //     </span>
                    //   </h4>
                    //   <ul className="list">
                    //     {item?.card?.card?.itemCards?.map((item, i) => {
                    //       return (
                    //         <li key={i}>
                    //           <div>
                    //             <h4>{item?.card?.info?.name}</h4>
                    //           </div>
                    //           <div>
                    //             {item?.card?.info?.imageId ? (
                    //               <img
                    //                 src={
                    //                   "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                    //                   item?.card?.info?.imageId
                    //                 }
                    //               />
                    //             ) : (
                    //               ""
                    //             )}
                    //           </div>
                    //         </li>
                    //       );
                    //     })}
                    //   </ul>
                    // </div>
                  }
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantDetails;
