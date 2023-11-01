import { useState } from "react";
import restaurants from "../utils/mock";
import Card from "./Card";

const Body = () => {
  const [resCards, setResCards] = useState(restaurants);
  return (
    <div className="body">
      <button
        onClick={() =>
          setResCards(resCards.filter((card) => card.info.avgRating >= 4))
        }
      >
        Top Rated Restaurants
      </button>
      {/* <div className="search">Search</div> */}
      <div className="res-container">
        {resCards.map((restaurant) => (
          <Card resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
