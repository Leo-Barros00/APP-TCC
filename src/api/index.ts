import axios, { AxiosInstance } from 'axios'

const HOST = 'http://172.16.237.70'
const mainApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3333`,
})

export const authApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3330`,
})
export default mainApi
