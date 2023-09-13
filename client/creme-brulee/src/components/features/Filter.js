import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  filter:[]
 
}
const  filteredSlice = createSlice({
  name: 'filtered',
  initialState,
  reducers: {
   setFiltered:(state,action)=>{
   state.filter =  action.payload;
   }

  },
});

export const { setFiltered } = filteredSlice.actions;
export default filteredSlice.reducer;

