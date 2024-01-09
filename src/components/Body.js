import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card, { cardWithDiscount } from "./Card";
import { ShimmerContainer } from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { restaurants } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Body = () => {
  const [filteredArr, setFilteredArr] = useState([]);
  const [resCards, setResCards] = useState([]);
  const [inputVal, setInputVal] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const prmseData = await fetch(restaurants);
    const dataArr = await prmseData.json();
    setResCards(
      dataArr?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredArr(
      dataArr?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };
  const filterList = () => {
    const resArr = resCards.filter((res) => {
      return res.info.name.toLowerCase().includes(inputVal.toLowerCase());
    });
    setFilteredArr(resArr);
  };
  if (!useOnlineStatus()) {
    return (
      <div>Looks like you are offline!!! 😱, plzzzz check your connection.</div>
    );
  }
  if (resCards?.length === 0) {
    return <ShimmerContainer />;
  }

  const CardWithDiscount = cardWithDiscount(Card);

  return (
    <div className="container mx-auto px-8">
      <div className="flex my-6 px-4">
        <button
          className="text-xs px-2 py-2 border border-solid border-slate-400 bg-white rounded-full"
          onClick={() =>
            setFilteredArr(
              filteredArr.filter((card) => card.info.avgRating >= 4)
            )
          }
        >
          Top Rated Restaurants
        </button>
        <div className="pl-4 flex content-center">
          <div className="relative">
            <input
              name="search-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search..."
              className="px-[10px] py-[8px] border border-solid border-slate-400 rounded-full text-xs"
            />
            {inputVal && (
              <span
                className="absolute right-[15px] top-[50%] translate-y-[-50%]"
                onClick={() => {
                  setFilteredArr(resCards);
                  setInputVal("");
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-[#637d6f] cursor-pointer text-[18px]"
                />
              </span>
            )}
          </div>
          <button
            className="text-xs px-2 py-2 border border-solid border-[#637d6f] bg-[#637d6f] text-white rounded-full ml-2 transition-[background] duration-[400ms] uppercase hover:bg-white hover:text-[#637d6f]"
            onClick={filterList}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredArr?.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant.info.id}
            >
              {restaurant?.info?.aggregatedDiscountInfoV3 ? (
                <CardWithDiscount resData={restaurant} />
              ) : (
                <Card resData={restaurant} keys={restaurant.info.id} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
