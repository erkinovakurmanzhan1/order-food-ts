import { Basket } from '../common/types'
import { mainApi } from './instanses'

const putBasketRequest = (id: string, amount: number) => {
  return mainApi.put(`/basketitem/${id}/update`, { amount: amount })
}
const deleteBasketRequest = (id: string) => {
  return mainApi.delete(`/basketitem/${id}/delete`, {})
}
const getBasketRequest = () => {
  return mainApi.get('/basket')
}
const postBasketRequest = (newItem: Basket) => {
  return mainApi.post(`/foods/${newItem.id}/addToBasket`, {
    amount: newItem.amount,
  })
}
export default {
  getBasketRequest,
  postBasketRequest,
  putBasketRequest,
  deleteBasketRequest,
}
