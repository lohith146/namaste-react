import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { RestaurantDetailsShimmer } from "./Shimmer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const RestaurantDetails = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menuDetails, setMenuDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    const resp = await fetch(MENU_URL + id);
    const details = await resp?.json();
    setRestaurantDetails(details?.data?.cards[0]?.card?.card?.info);
    setMenuDetails(
      details?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
  };

  const {
    name,
    areaName,
    avgRating,
    costForTwoMessage,
    cuisines,
    totalRatingsString,
    sla,
    aggregatedDiscountInfo,
  } = restaurantDetails;
  const sortOnlyVeg = () => {};
  if (!menuDetails.length) {
    return <RestaurantDetailsShimmer />;
  }

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-details">
        <div>
          <h4>{name}</h4>
          <p>{cuisines?.join(", ")}</p>
          <span>{areaName}</span>
          <span></span>
        </div>
        <div className="rating">
          <p>{avgRating}</p>
          <span>{totalRatingsString}</span>
        </div>
      </div>
      <div className="delivery-info">
        <div className="time">
          <span>{sla?.slaString}</span>
          <span>{costForTwoMessage}</span>
        </div>
        <div className="coupons">
          {aggregatedDiscountInfo?.descriptionList?.map((discount, i) => (
            <div key={i}>{discount?.meta}</div>
          ))}
        </div>
      </div>
      <div className="vegonly">
        <button onClick={sortOnlyVeg}>Veg only</button>
      </div>
      <h2>Menu</h2>
      <div className="menuItems">
        {menuDetails.map((item, i) => (
          <div key={i}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
