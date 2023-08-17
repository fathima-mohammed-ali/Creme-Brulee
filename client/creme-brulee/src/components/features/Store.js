import { configureStore } from '@reduxjs/toolkit'
import PriceFilter from './PriceFilter'
export const store = configureStore({
  reducer: {
   PriceFilter:PriceFilter
  },
})