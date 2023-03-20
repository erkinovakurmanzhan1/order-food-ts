import { Meal } from '../common/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
import { mainApi } from './instanses'

type AllMealsResponse = {
  data: Meal[]
}

const getAllMeals = () => {
  return mainApi.get<AllMealsResponse>('/foods')
}
type MealResponse = {
  data: Meal
}
const getMealById = (id: string) => {
  return mainApi.get<MealResponse>(`/foods/${id}`)
}

const deleteMeal = (id: string) => {
  return mainApi.delete<AllMealsResponse>(`/foods/${id}`)
}

const updateMeal = (id: string, values: FormSchema) => {
  return mainApi.put<AllMealsResponse>(`/foods/${id}`, values)
}

const addMeals = (data: FormSchema) => {
  return mainApi.post<MealResponse>('/foods', data)
}
export default { deleteMeal, getAllMeals, getMealById, updateMeal, addMeals }
