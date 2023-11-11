import store from '@Store/configureStore'
import axios, { AxiosInstance } from 'axios'

const HOST = 'http://192.168.0.50'

const mainApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3333`,
})

mainApi.interceptors.request.use((config) => {
  const { token } = store.getState().auth

  if (token) config.headers.Authorization = `Bearer ${token.value}`

  return config
})

const authApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3330`,
})

export { authApi, mainApi }
