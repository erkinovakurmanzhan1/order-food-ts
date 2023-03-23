import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/types'
import { getBasket } from './basket.thunk'

type BasketState = {
  items: Meal[]
}
const initialState: BasketState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload
    })
    // builder.addCase(getBasket.pending, (state) => {
    //     state.isLoading = true
    // })
    // builder.addCase(getBasket.rejected, (state, action) => {
    //     state.error = action.payload
    //     state.isLoading = false
    // })

    // builder.addCase(deleteBasketItem.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(deleteBasketItem.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload
    //   state.error = ''
    // })
    // builder.addCase(deleteBasketItem.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })

    // builder.addCase(addToBasket.fulfilled, (state, action) => {
    //   state.items = action.payload
    // })
    // builder.addCase(addToBasket.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(addToBasket.rejected, (state, action) => {
    //   state.error = action.payload
    //   state.isLoading = false
    // })

    // builder.addCase(updateBasketItem.fulfilled, (state, action) => {
    //   state.items = action.payload
    // })
    // builder.addCase(updateBasketItem.pending, (state) => {
    //   state.isLoading = true
    // })
    // builder.addCase(updateBasketItem.rejected, (state, action) => {
    //   state.error = action.payload
    //   state.isLoading = false
    // })
  },
})
export const basketActions = basketSlice.actions
