import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSquareCaretUp,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import ExtraMenu from "./ExtraMenu";
import { ACCORDION_IMG_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const Accordion = (props) => {
  const [itemIndex, setItemIndex] = useState(null);
  const toggleItemIndex = (index) => {
    if (itemIndex === index) {
      return setItemIndex(null);
    }
    setItemIndex(index);
  };
  const dispatch = useDispatch();
  const addItems = (item) => {
    dispatch(addItem(item));
  };
  return (
    <>
      <h4
        className="cursor-pointer flex justify-between py-4 font-bold text-[18px]"
        onClick={() => {
          props.toggleAccordion(props.index);
        }}
      >
        <span>
          {props?.title}
          {props?.content?.length ? ` (${props?.content?.length})` : ""}
        </span>
        {props?.content?.length &&
          (props.active === props.index ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          ))}
      </h4>
      {props.extraMenu && (
        <div>
          {props.extraMenu?.map((item, i) => {
            return (
              <ExtraMenu
                item={item}
                i={i}
                key={i}
                itemIndexVal={itemIndex}
                toggleItemIndex={toggleItemIndex}
              />
            );
          })}
        </div>
      )}
      {props.content && (
        <>
          <ul
            className={
              props.active === props.index
                ? "h-full transition-all ease-in-out"
                : "h-0 overflow-hidden"
            }
          >
            {props?.content?.map((item, i) => {
              return (
                <li key={i} className="flex justify-between py-3">
                  <div>
                    {item?.card?.info?.itemAttribute?.vegClassifier ===
                      "NONVEG" ||
                    item?.card?.info?.itemAttribute?.vegClassifier === "EGG" ? (
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
                      ₹{" "}
                      {item?.card?.info?.price
                        ? Math.floor(item?.card?.info?.price / 100)
                        : item?.card?.info?.defaultPrice / 100}
                    </p>
                    <p className="text-[13px] font-light text-slate-400 py-2 max-w-xl">
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
                          ? "text-center w-[80%] text-[13px] border-orange-500 border-solid border-[1px] text-orange-500 uppercase font-semibold p-2 bottom-[-10px] z-[1] bg-white h-[40px] absolute top-[95%] right-[50%] translate-x-[50%] translate-y-[-50%] rounded-md shadow-xl"
                          : "text-center w-[100px] text-[13px] border-orange-500 border-solid border-[1px] text-orange-500 uppercase font-semibold p-2 bottom-[-10px] z-[1] bg-white h-[40px] absolute top-[50%] right-[50%] translate-x-[-15%] translate-y-[-50%] rounded-md shadow-xl"
                      }
                      onClick={() => addItems(item)}
                    >
                      Add
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Accordion;
