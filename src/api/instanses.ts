import axios from 'axios'
import { signOut } from '../store/auth/auth.thunk'
import store from '../store/store'

export const mainApi = axios.create({
  baseURL:
    'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1',
})

mainApi.interceptors.request.use(
  function (config) {
    config.headers.set('Authorization', store.getState().auth.token)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
mainApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(signOut())
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
