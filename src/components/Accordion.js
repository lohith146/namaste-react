import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Accordion = (props) => {
  const [active, setActive] = useState(false);
  return (
    <div className="border-b-[12px]">
      <h4
        className="cursor-pointer flex justify-between py-4 px-2 font-bold text-[18px]"
        onClick={() => {
          setActive(!active);
          const listRef = document.getElementById("list" + props.index);
          listRef.classList.toggle("active");
        }}
      >
        <span>
          {props?.title}
          {props?.content?.length ? ` (${props?.content?.length})` : ""}
        </span>
        {props?.content?.length &&
          (active ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          ))}
      </h4>
      <ul className={active ? "block" : "hidden"} id={"list" + props.index}>
        {props?.content?.map((item, i) => {
          return (
            <li key={i} className="flex justify-between py-4 px-2">
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
                  className="w-[100px] h-[100px] rounded-lg"
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

export default Accordion;
