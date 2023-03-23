import { createSlice } from '@reduxjs/toolkit'
import { OrderAdmin } from '../../common/types'
import { getAllOrders } from './order.thunk'

type OrderState = {
  itemsAll: OrderAdmin[]
}
const initialState: OrderState = {
  itemsAll: [],
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.itemsAll = action.payload
    })
    // builder.addCase(getMyOrder.fulfilled, (state, action) => {
    //   state.order = action.payload
    //   state.isLoading = false
    //   state.error = ''
    // })
    // builder.addCase(getMyOrder.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(getMyOrder.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })

    // builder.addCase(getAllOrders.pending, (state) => {
    //     state.isLoading = true
    // })
    // builder.addCase(getAllOrders.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.error = action.payload
    // })
  },
})
