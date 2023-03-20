import UserRoles from '../common/types'
import { mainApi } from './instanses'

type SignInResponse = {
  data: {
    token: string
    user: {
      role: UserRoles
      email: string
      name: string
    }
  }
}

const signIn = (data: { email: string; password: string }) => {
  return mainApi.post<SignInResponse>('auth/login', data)
}

const signUp = (data: { email: string; password: string; name: string }) => {
  return mainApi.post<SignInResponse>('auth/register', data)
}
export default { signIn, signUp }
