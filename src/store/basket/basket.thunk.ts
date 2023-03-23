import { createAsyncThunk } from '@reduxjs/toolkit'
import basketService from '../../api/basketService'
import { Basket } from '../../common/types'
import { Info } from '../../components/basket/Basket'

export const getBasket = createAsyncThunk(
  'basket/getBasket',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await basketService.getBasketRequest()
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong getBasket ')
    }
  }
)

export const addToBasket = createAsyncThunk(
  'basket/addToBasket',
  async (newItem: Basket, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await basketService.postBasketRequest(newItem)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong basket')
    }
  }
)

export const deleteBasketItem = createAsyncThunk(
  'basket/deleteBasket',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await basketService.deleteBasketRequest(id)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something  went wrong delete ')
    }
  }
)

export const updateBasketItem = createAsyncThunk(
  'basket/updateBasket',
  async ({ id, amount }: Info, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await basketService.putBasketRequest(id, amount)
      dispatch(getBasket())
      return data.data.items
    } catch (error) {
      return rejectWithValue('something went wrong update')
    }
  }
)
