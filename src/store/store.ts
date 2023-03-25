import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import { basketSlice } from './basket/basket.slice'
import { mealsSlice } from './meals/meals.slice'
import { orderSlice } from './order/order.slice'
import { uiSlice } from './ui/ui.slice'

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [mealsSlice.name]: mealsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [basketSlice.name]: basketSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
