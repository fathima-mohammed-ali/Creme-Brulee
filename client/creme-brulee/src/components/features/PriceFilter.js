import { createSlice } from '@reduxjs/toolkit';

const priceFilterSlice = createSlice({
  name: 'priceFilter',
  initialState: {
    minPrice: 0,
    maxPrice:100,
  },
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const { setMinPrice, setMaxPrice } = priceFilterSlice.actions;
export default priceFilterSlice.reducer;
