import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import orderService from '../../api/orderService'

export const getMyOrder = createAsyncThunk(
  'basket/getOrder',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getMyOrderRequest()
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{ status: number; message: string }>

        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong  getOrders')
    }
  }
)

export const getAllOrders = createAsyncThunk(
  'basket/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getAllOrdersRequest()
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{ status: number; message: string }>

        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong  getAllOrders')
    }
  }
)
export const submitOrder = createAsyncThunk(
  'basket/postOrder',
  async (payload: { price: number }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await orderService.createOrderRequest(payload)
      dispatch(getAllOrders())
      dispatch(getMyOrder())
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{ status: number; message: string }>

        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong  postOrders')
    }
  }
)
