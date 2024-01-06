import { CARD_IMG_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const {
    name,
    avgRatingString,
    sla,
    cuisines,
    areaName,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
  } = props.resData.info;

  return (
    <div className="w-[300px] p-4 hover:scale-[0.95] ease-in-out duration-300">
      <div className="bg-black overflow-hidden h-[200px] w-full rounded-lg relative">
        <img
          src={CARD_IMG_URL + cloudinaryImageId}
          about="res-logo"
          className="w-full h-full"
        />
        <h1 className="text-[20px] font-extrabold text-white bottom-0 absolute px-[10px] pt-[30px] pb-[10px] w-full bg-gradient-to-t from-[rgb(27,30,36)] to-[rgba(27, 30, 36, 0)">
          {aggregatedDiscountInfoV3
            ? aggregatedDiscountInfoV3?.header +
              aggregatedDiscountInfoV3?.subHeader
            : ""}
        </h1>
      </div>
      <div className="px-2">
        <h4 className="text-[16px] font-bold py-2">{name}</h4>
        <h5 className="text-[14px] pb-1 flex items-center font-semibold">
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="mr-1 bg-[#637d6f] text-white text-[9px] p-1 rounded-full"
            />
            {+Math.trunc(avgRatingString) === +avgRatingString
              ? +Math.trunc(avgRatingString)
              : +avgRatingString}
          </span>
          <span className="block w-1 h-1 rounded-full bg-black mx-1"></span>
          <span>{sla.slaString}</span>
        </h5>
        <h6 className="text-[14px] font-light text-slate-400 truncate">
          {cuisines.join(", ")}
        </h6>
        <h6 className="text-[14px] font-light text-slate-400">{areaName}</h6>
      </div>
    </div>
  );
};

export const cardWithDiscount = (Card) => {
  return (props) => {
    return (
      <div>
        <Card {...props} />
      </div>
    );
  };
};
export default Card;
