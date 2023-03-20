import { createAsyncThunk } from '@reduxjs/toolkit'
import mealsService from '../../api/mealsService'
import { AxiosError, isAxiosError } from 'axios'
import { Data, FormSchema } from '../../components/admin/pages/meals/MealModal'

export const getAllMeals = createAsyncThunk(
  'meals/getAll',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mealsService.getAllMeals()
      return data.data
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError<{ status: number; message: string }>

        return rejectWithValue(error.response?.data.message)
      }
      return rejectWithValue('Something went wrong!')
    }
  }
)

export const deleteMeal = createAsyncThunk(
  'meals/delete',
  async (id: string, { rejectWithValue, dispatch }) => {
    console.log(id)
    try {
      await mealsService.deleteMeal(id)
      return dispatch(getAllMeals())
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const addMeals = createAsyncThunk(
  'meals/addMeals',
  async (payload: FormSchema, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await mealsService.addMeals(payload)
      dispatch(getAllMeals())
      return data.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const editMeals = createAsyncThunk(
  'meals/updateMeal',
  async ({ id, values }: Data, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await mealsService.updateMeal(id, values)
      dispatch(getAllMeals())
      return data.data
    } catch (error) {
      return rejectWithValue('Something went wrong  deleteMeals')
    }
  }
)
