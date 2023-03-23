import { OrderAdmin } from '../common/types'
import { mainApi } from './instanses'

const getMyOrderRequest = () => {
  return mainApi.get(`/orders`)
}

const createOrderRequest = (totalPrice: { price: number }) => {
  return mainApi.post(`/orders`, totalPrice)
}

type AllMealsResponse = {
  data: OrderAdmin[]
}

const getAllOrdersRequest = () => {
  return mainApi.get<AllMealsResponse>(`/orders/all`)
}
export default { getAllOrdersRequest, createOrderRequest, getMyOrderRequest }
