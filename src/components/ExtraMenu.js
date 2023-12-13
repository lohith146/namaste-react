import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ExtraMenu = ({ item, i }) => {
  const [extraMenuActive, setExtraMenuActive] = useState(false);
  return (
    <div
      key={i}
      className="border-b-gray-100 border-b-2 border-solid last:border-none"
    >
      <h4
        className="cursor-pointer flex justify-between py-4 font-normal text-[16px]"
        onClick={() => {
          setExtraMenuActive(!extraMenuActive);
        }}
      >
        <span>
          {item?.title}
          {item?.itemCards?.length ? ` (${item.itemCards?.length})` : ""}
        </span>
        {item?.itemCards?.length &&
          (extraMenuActive ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          ))}
      </h4>
      <ul className={extraMenuActive ? "block" : "hidden"}>
        {item.itemCards?.map((item, itemIndex) => {
          return (
            <li
              key={item?.card?.info?.id}
              className="flex justify-between py-4 border-solid border-gray-100 border-b-2 last:border-none"
            >
              <div>
                <h4 className="font-medium text-[16px]">
                  {item?.card?.info?.name}
                </h4>
                <p className="text-[14px] font-light pt-2">
                  Rs. {Math.floor(item?.card?.info?.price / 100)}
                </p>
                <p className="text-[14px] font-light text-slate-400 py-2">
                  {item?.card?.info?.description}
                </p>
              </div>
              {item?.card?.info?.imageId ? (
                <img
                  className="w-[110px] h-[80px] rounded-lg"
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                    item?.card?.info?.imageId
                  }
                />
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ExtraMenu;
