import Accordion from "./Accordion";
import { useParams } from "react-router-dom";
import { RestaurantDetailsShimmer } from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const RestaurantDetails = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const price = useSelector((store) => store.cart.price);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const toggleAccordion = (index) => {
    if (openCardIndex === index) {
      return setOpenCardIndex(null);
    }
    setOpenCardIndex(index);
  };
  const { id } = useParams();
  const restDetails = useRestaurantDetails(id);
  if (restDetails === null) {
    return <RestaurantDetailsShimmer />;
  }
  const {
    name,
    areaName,
    avgRatingString,
    costForTwoMessage,
    cuisines,
    totalRatingsString,
    sla,
    aggregatedDiscountInfo,
  } = restDetails?.data?.cards[0]?.card?.card?.info;
  const menuDetails =
    restDetails?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  // const menuDetails =
  //   restDetails?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
  //     (item) =>
  //       item?.card?.card?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   );
  const sortOnlyVeg = () => {};
  const cartBanner = (
    <div className="bg-green-600 text-white font-medium text-[14px] px-4 py-2 flex justify-between bottom-0 w-full my-2">
      {cartItems.length} Item | {price}
      <Link to="/cart" className="uppercase">
        view cart
      </Link>
    </div>
  );
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
            {avgRatingString}
          </p>
          <span className="text-[9px] font-medium text-slate-500 align-sb tracking-[-0.75px]">
            {totalRatingsString}
          </span>
        </div>
      </div>
      <div className="font-semibold py-4">
        <button onClick={sortOnlyVeg}>Veg Only</button>
      </div>
      <div className="menuItems">
        {menuDetails?.map((item, i) => {
          return (
            <div key={i} className="border-b-[12px] last:border-b-0">
              {item?.card?.card?.title && (
                <>
                  {
                    <Accordion
                      index={i}
                      title={item?.card?.card?.title}
                      content={item?.card?.card?.itemCards}
                      extraMenu={item?.card?.card?.categories}
                      active={openCardIndex}
                      toggleAccordion={toggleAccordion}
                    />
                  }
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 w-[800px] z-[2]">
        {cartItems.length > 0 ? cartBanner : ""}
      </div>
    </div>
  );
};

export default RestaurantDetails;
