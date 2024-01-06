import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretUp,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { ACCORDION_IMG_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const clearcart = () => {
    dispatch(resetCart());
  };
  return (
    <div className="max-w-2xl m-auto">
      <h1 className="text-center p-8 font-semibold text-[32px] tracking-wider">
        Cart
      </h1>
      <ul>
        {console.log(cartItems)}
        {cartItems?.map((item, i) => {
          console.log(item);
          const { name, price, defaultPrice, imageId, description } =
            item?.info;
          console.log(name);
          const classifier = item?.info?.itemAttribute?.vegClassifier;

          return (
            <li key={i} className="flex justify-between py-3">
              <div>
                {classifier === "NONVEG" || classifier === "EGG" ? (
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
                <h4 className="font-medium text-[16px]">{name}</h4>
                {item?.quantity > 0 && <p>Quantity : {item?.quantity}</p>}
                <p className="text-[14px] font-light pt-2">
                  {console.log(price, item?.totalPrice)}
                  {console.log(price < item?.totalPrice)}₹
                  {price > item?.totalPrice
                    ? Math.floor(price / 100)
                    : Math.floor(item?.totalPrice / 100)}
                </p>
                {/* <p className="text-[14px] font-light pt-2">
                  ₹ {console.log(price, totalPrice)}
                  {(
                    price < totalPrice
                      ? Math.floor(price / 100)
                      : Math.floor(totalPrice / 100)
                  )
                    ? Math.floor(price / 100)
                    : defaultPrice}
                </p> */}
                <p className="text-[13px] font-light text-slate-400 py-2 max-w-xl">
                  {description}
                </p>
              </div>
              <div className="relative h-[100px]">
                {imageId && (
                  <img
                    className="w-[130px] h-[100px] rounded-lg"
                    src={ACCORDION_IMG_URL + imageId}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {cartItems.length > 0 ? (
        <button
          onClick={clearcart}
          className="bg-red-500 text-white font-semibold text-[16px] p-2 my-4 w-full text-center rounded-md"
        >
          Clear Cart
        </button>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold text-[18px] mb-4">
            Your Cart is empty, Add Items to your Cart
          </h1>
          <Link
            className="p-2 border-[#637d6f] border-[1px] bg-[#637d6f] font-semibold text-[16px] text-white rounded-md transition-[background] duration-[400ms] uppercase hover:bg-white hover:text-[#637d6f]"
            to="/"
          >
            Add Items
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
