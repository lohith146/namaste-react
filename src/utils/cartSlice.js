import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    price: 0,
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.price = state.items.reduce((acc, cur) => {
        console.log(acc, cur);
        return acc + cur?.card?.info?.price / 100;
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
