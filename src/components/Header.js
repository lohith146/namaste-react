import { useState } from "react";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import store from "../utils/store";
import Logo from "../assets/logo.png";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const toggleBtn = () => {
    setBtnName(btnName === "Login" ? "Logout" : "Login");
  };
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-between items-center py-2 px-[128px] shadow-md">
      <div className="h-[100px]">
        <NavLink to={"/"}>
          <img src={Logo} className="h-full" />
        </NavLink>
      </div>
      <ul className="flex items-center">
        {/* <li className="p-4 text-[16px] font-medium">
          {useOnlineStatus() ? "🟢 Online" : "🔴 Offline"}
        </li> */}
        <li className="p-4 text-[18px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-[#637d6f]" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="p-4 text-[18px] font-medium">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-[#637d6f]" : "")}
          >
            About Us
          </NavLink>
        </li>
        <li className="p-4 text-[18px] font-medium">
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-[#637d6f]" : "")}
          >
            Contact Us
          </NavLink>
        </li>
        <li className="p-4 text-[18px] font-medium">
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "text-[#637d6f]" : "")}
          >
            {cartItems.length > 0 && cartItems.length} Cart
          </NavLink>
        </li>
        <li className="p-4 text-[18px] font-medium">
          <NavLink
            to="/groceries"
            className={({ isActive }) => (isActive ? "text-[#637d6f]" : "")}
          >
            Groceries
          </NavLink>
        </li>
        <li
          className="p-4 text-[18px] font-medium cursor-pointer"
          onClick={toggleBtn}
        >
          {btnName}
        </li>
      </ul>
    </div>
  );
};

export default Header;
