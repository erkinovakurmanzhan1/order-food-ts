import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/types'
import { getAllMeals } from './meals.thunk'

type MealsState = {
  items: Meal[]
  isLoading: boolean
  error: string
}

const initialState: MealsState = {
  items: [],
  isLoading: false,
  error: '',
}

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMeals.fulfilled, (state, { payload }) => {
      state.items = payload
      state.isLoading = false
      state.error = ''
    })
  },
})
