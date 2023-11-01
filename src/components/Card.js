import { CARD_IMG_URL } from "../utils/constants";
const Card = (props) => {
  const { name, avgRatingString, sla, cuisines, areaName, cloudinaryImageId } =
    props.resData.info;

  return (
    <div className="card">
      <img
        src={CARD_IMG_URL + cloudinaryImageId}
        about="res-logo"
        className="res-img"
      />
      <div className="res-details">
        <h4 className="res-name">{name}</h4>
        <h5 className="res-rating">
          <span>{avgRatingString}</span>
          <span>{sla.slaString}</span>
        </h5>
        <h6 className="items">{cuisines.join(", ")}</h6>
        <h6 className="address">{areaName}</h6>
      </div>
    </div>
  );
};

export default Card;
