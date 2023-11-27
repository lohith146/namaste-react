import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantDetails = (id) => {
  const [restDetails, setRestDetails] = useState(null);
  const fetchResDetails = async (id) => {
    const resp = await fetch(MENU_URL + id);
    const json = await resp.json();
    setRestDetails(json);
  };
  useEffect(() => {
    fetchResDetails(id);
  }, []);
  return restDetails;
};
export default useRestaurantDetails;
