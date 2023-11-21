import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { ShimmerContainer } from "./Shimmer";

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
  if (resCards?.length === 0) {
    return <ShimmerContainer />;
  }
  return (
    <div className="body">
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={() =>
            setFilteredArr(
              filteredArr.filter((card) => card.info.avgRating >= 4)
            )
          }
        >
          Top Rated Restaurants
        </button>
        <div className="search">
          <div className="input-container">
            <input
              name="search-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search..."
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
          </div>
          <button className="btn btn-primary" onClick={filterList}>
            Search
          </button>
        </div>
      </div>
      <div className="res-container">
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
