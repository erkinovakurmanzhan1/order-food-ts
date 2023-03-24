enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}
export default UserRoles

export interface Meal {
  readonly _id: string
  price: number
  title: string
  amount: number
  description: string
}

export type Column<T> = {
  header: string
  key: string
  minWidth?: string | number
  align?: 'left' | 'right' | 'center'
  index?: boolean
  render?: (meal: T) => JSX.Element
}

type Order = {
  _id: string
  price: number
  amount: number
  title: string
}

export type OrderAdmin = {
  readonly _id: string
  items: Order[]
  totalPrice: number
  createdAt: string
  user: {
    name: string
    _id: string
  }
}

export type Basket = {
  id: string
  price: number
  title: string
  amount: number
}
