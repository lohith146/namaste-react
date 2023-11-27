import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const toggleBtn = () => {
    setBtnName(btnName === "Login" ? "Logout" : "Login");
  };
  return (
    <div className="flex justify-between items-center py-2 px-[128px] shadow-md">
      <div className="h-10">
        <Link to={"/"}>
          <img src={LOGO_URL} className="h-full" />
        </Link>
      </div>
      <ul className="flex items-center">
        <li className="p-4 text-[16px] font-medium">
          {useOnlineStatus() ? "🟢 Online" : "🔴 Offline"}
        </li>
        <li className="p-4 text-[16px] font-medium">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 text-[16px] font-medium">
          <Link to="/about">About Us</Link>
        </li>
        <li className="p-4 text-[16px] font-medium">
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className="p-4 text-[16px] font-medium">
          <Link to="/cart">Cart</Link>
        </li>
        <li className="p-4 text-[16px] font-medium">
          <Link to="/groceries">Groceries</Link>
        </li>
        <li className="p-4 text-[16px] font-medium" onClick={toggleBtn}>
          {btnName}
        </li>
      </ul>
    </div>
  );
};

export default Header;
