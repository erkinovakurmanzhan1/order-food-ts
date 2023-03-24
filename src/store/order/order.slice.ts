import { createSlice } from '@reduxjs/toolkit'
import { OrderAdmin } from '../../common/types'
import { getAllOrders, getMyOrder } from './order.thunk'

type OrderState = {
  itemsAll: OrderAdmin[]
  items: OrderAdmin[]
}
const initialState: OrderState = {
  itemsAll: [],
  items: [],
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.itemsAll = action.payload
    }),
      builder.addCase(getMyOrder.fulfilled, (state, action) => {
        state.items = action.payload
      })
  },
})
