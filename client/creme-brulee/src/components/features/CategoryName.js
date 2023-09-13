import { createSlice } from "@reduxjs/toolkit";
const initialState={
   names:{
    cake:true,
    donut:false,
    dessert:false,
    cupcake:false,
   } 
}
const categoryNameSlice= createSlice({
    name:'categoryName',
    initialState,
    reducers:{
        setCategoryName:(state,action)=>{
            state.names={...action.payload};
        },
        toggleCategory: (state, action) => {
            const categoryToToggle = action.payload;
            state.names[categoryToToggle] = !state.names[categoryToToggle];
          },
    }
})
export const {setCategoryName,toggleCategory}= categoryNameSlice.actions;
export default categoryNameSlice.reducer;
