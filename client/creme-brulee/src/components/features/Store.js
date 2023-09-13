import { configureStore } from '@reduxjs/toolkit'
import filteredReducer from './Filter'
import selectedCategoryReducer from './Categories'
import categoryNameReducer from './CategoryName'
export const store = configureStore({
  reducer: {
    filtered: filteredReducer,
    selectedCategory:selectedCategoryReducer,
    categoryName:categoryNameReducer,
   
  },
})



export default store;