import { CARD_IMG_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const { name, avgRatingString, sla, cuisines, areaName, cloudinaryImageId } =
    props.resData.info;

  return (
    <div className="w-[300px] p-4 hover:bg-gray-100 rounded-lg">
      <img
        src={CARD_IMG_URL + cloudinaryImageId}
        about="res-logo"
        className="h-[200px] w-full rounded-lg"
      />
      <div className="px-2">
        <h4 className="text-[16px] font-bold py-2">{name}</h4>
        <h5 className="text-[14px] pb-1 flex items-center font-semibold">
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="mr-1 bg-green-400 text-white text-[9px] p-1 rounded-full"
            />
            {avgRatingString}
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

export default Card;
