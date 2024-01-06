import Accordion from "./Accordion";
import { useParams } from "react-router-dom";
import { RestaurantDetailsShimmer } from "./Shimmer";
import useRestaurantDetails from "../utils/useRestaurantDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Switch } from "antd";

const RestaurantDetails = () => {
  const { id } = useParams();
  const cartItems = useSelector((store) => store.cart.items);
  const price = useSelector((store) => store.cart.price);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [allMenu, setAllMenu] = useState([]);
  const [menuDetails, setMenuDeatils] = useState([]);
  const restDetails = useRestaurantDetails(id);

  const filterResDetails = () => {
    return restDetails?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (item) =>
        item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
  };

  const filterVegItems = () => {
    return menuDetails.map((menuItem) => {
      if (menuItem?.card?.card?.itemCards) {
        return {
          card: {
            card: {
              ...menuItem?.card?.card,
              itemCards: menuItem?.card?.card?.itemCards?.filter(
                (item) =>
                  item?.card?.info?.itemAttribute?.vegClassifier === "VEG"
              ),
            },
          },
        };
      }
      if (menuItem?.card?.card?.categories) {
        return {
          card: {
            card: {
              ...menuItem?.card?.card,
              categories: menuItem?.card?.card?.categories.map((item) => {
                return {
                  ...item,
                  itemCards: item?.itemCards.filter(
                    (prevItem) =>
                      prevItem?.card?.info?.itemAttribute?.vegClassifier ===
                      "VEG"
                  ),
                };
              }),
            },
          },
        };
      }
    });
  };

  useEffect(() => {
    setAllMenu(filterResDetails());
    setMenuDeatils(filterResDetails());
  }, [restDetails]);

  if (restDetails === null) {
    return <RestaurantDetailsShimmer />;
  }

  const toggleAccordion = (index) => {
    if (openCardIndex === index) {
      return setOpenCardIndex(null);
    }
    setOpenCardIndex(index);
  };

  const { name, areaName, avgRatingString, cuisines, totalRatingsString, sla } =
    restDetails?.data?.cards[0]?.card?.card?.info;

  const sortOnlyVeg = (checked) => {
    checked ? setMenuDeatils(filterVegItems()) : setMenuDeatils(allMenu);
  };

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
      <div className="font-semibold py-4 flex items-center">
        <label className="mr-[8px]">Only Veg</label>
        <Switch
          size="small"
          onChange={sortOnlyVeg}
          className="bg-gray-400 min-w-[30px]"
        />
      </div>
      <div className="menuItems">
        {menuDetails?.map((item, i) => {
          return (
            <div
              key={i}
              className={
                item?.card?.card?.itemCards?.length > 0
                  ? "border-b-[12px] last-of-type:border-b-0"
                  : ""
              }
            >
              <Accordion
                index={i}
                title={item?.card?.card?.title}
                content={item?.card?.card?.itemCards}
                extraMenu={item?.card?.card?.categories}
                active={openCardIndex}
                toggleAccordion={toggleAccordion}
              />
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
