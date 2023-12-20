import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSquareCaretUp,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { ACCORDION_IMG_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ExtraMenu = ({ item, i, toggleItemIndex, itemIndexVal }) => {
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div
      key={i}
      className="border-b-gray-100 border-b-2 border-solid last:border-none"
    >
      <h4
        className="cursor-pointer flex justify-between py-4 font-normal text-[16px]"
        onClick={() => toggleItemIndex(i)}
      >
        <span>
          {item?.title}
          {item?.itemCards?.length ? ` (${item.itemCards?.length})` : ""}
        </span>
        {item?.itemCards?.length &&
          (itemIndexVal === i ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          ))}
      </h4>
      <ul className={itemIndexVal === i ? "block" : "hidden"}>
        {item.itemCards?.map((item, itemIndex) => {
          return (
            <li
              key={item?.card?.info?.id}
              className="flex justify-between pt-4 pb-6 border-solid border-gray-100 border-b-2 last:border-none"
            >
              <div>
                {item?.card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
                  <FontAwesomeIcon
                    icon={faSquareCaretUp}
                    className="text-[16px] text-red-600"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleDot}
                    className="text-[16px] text-green-600"
                  />
                )}

                <h4 className="font-medium text-[16px]">
                  {item?.card?.info?.name}
                </h4>
                <p className="text-[14px] font-light pt-2">
                  Rs.{" "}
                  {item?.card?.info?.price
                    ? Math.floor(item?.card?.info?.price / 100)
                    : item?.card?.info?.defaultPrice / 100}
                </p>
                <p className="text-[14px] font-light text-slate-400 py-2 max-w-xl">
                  {item?.card?.info?.description}
                </p>
              </div>
              <div className="relative h-[100px]">
                {item?.card?.info?.imageId && (
                  <img
                    className="w-[130px] h-[100px] rounded-lg"
                    src={ACCORDION_IMG_URL + item?.card?.info?.imageId}
                  />
                )}
                <button
                  className={
                    item?.card?.info?.imageId
                      ? "text-center w-[80%] text-[13px] border-orange-500 border-solid border-[1px] text-orange-500 uppercase font-semibold p-2 bottom-[-10px] z-[1] bg-white h-[40px] absolute top-[90%] right-[50%] translate-x-[50%] translate-y-[-50%] rounded-md shadow-xl"
                      : "text-center w-[100px] text-[13px] border-orange-500 border-solid border-[1px] text-orange-500 uppercase font-semibold p-2 bottom-[-10px] z-[1] bg-white h-[40px] absolute top-[50%] right-[50%] translate-x-[-15%] translate-y-[-50%] rounded-md shadow-xl"
                  }
                  onClick={() => {
                    addItemToCart(item);
                  }}
                >
                  Add
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ExtraMenu;
