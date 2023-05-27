import axios, { AxiosInstance } from 'axios'

const HOST = 'http://172.168.237.70'
export const mainApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3333`,
})

export const authApi: AxiosInstance = axios.create({
  baseURL: `${HOST}:3330`,
})
