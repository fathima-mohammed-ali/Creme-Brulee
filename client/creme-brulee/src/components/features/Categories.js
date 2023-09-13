import { createSlice } from "@reduxjs/toolkit";
const initialState={
   select_Category:[]
}
const selectedCategorySlice = createSlice({
    name:'selectedCategory',
    initialState,
    reducers:{
       setSelectedCategory:(state,action)=>{
        state.select_Category = action.payload;
       }
    }
})

export const {setSelectedCategory} = selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;