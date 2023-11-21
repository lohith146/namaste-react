import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Accordion = (props) => {
  const [active, setActive] = useState(false);
  return (
    <div className="menu-title">
      <h4
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
      <ul className="list" id={"list" + props.index}>
        {props?.content?.map((item, i) => {
          return (
            <li key={i}>
              <div>
                <h4>{item?.card?.info?.name}</h4>
              </div>
              <div>
                {item?.card?.info?.imageId ? (
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                      item?.card?.info?.imageId
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;
