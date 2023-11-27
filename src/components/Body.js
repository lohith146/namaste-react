import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { ShimmerContainer } from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [filteredArr, setFilteredArr] = useState([]);
  const [resCards, setResCards] = useState([]);
  const [inputVal, setInputVal] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const prmseData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.6851243&lng=83.2035471&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const dataArr = await prmseData.json();
    setResCards(
      dataArr?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredArr(
      dataArr?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
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
          <input
            name="search-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search..."
            className="p-2 border border-solid border-slate-400 rounded-full text-xs"
          />
          {inputVal && (
            <span
              onClick={() => {
                setFilteredArr(resCards);
                setInputVal("");
              }}
            >
              x
            </span>
          )}
          <button
            className="text-xs px-2 py-2 border border-solid border-slate-400 bg-white rounded-full ml-2"
            onClick={filterList}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredArr?.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant?.info?.id}
            key={restaurant.info.id}
          >
            <Card resData={restaurant} key={restaurant.info.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
