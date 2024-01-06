import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    price: 0,
  },
  reducers: {
    addItem(state, action) {
      const objFound = state.items.find(
        (item) => item?.info?.id === action?.payload?.info?.id
      );
      if (objFound) {
        const findIndex = state.items.findIndex(
          (item) => item?.info?.id === objFound?.info?.id
        );
        const newItems = [...state.items];
        newItems[findIndex] = {
          ...objFound,
          quantity: ++objFound.quantity,
          info: {
            ...objFound.info,
            totalPrice: objFound.info.price * objFound.quantity,
          },
        };
        state.items = newItems;
      } else {
        state.items.push(action.payload);
      }
      state.price = state.items.reduce((acc, cur) => {
        return acc + (cur?.info?.price * cur?.quantity) / 100;
      }, 0);
    },
    removeItem(state) {
      state.pop();
    },
    resetCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
