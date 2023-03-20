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
  amount: string
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
