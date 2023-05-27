import { AxiosError } from 'axios'

import mainApi from '@Api/index'

const header = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } }
}

class HouseService {
  public static async getHouses(token: string) {
    try {
      const response = await mainApi.get('/house', header(token))
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }

  public static async setNewHouse(reqBody: IHouse, token: string) {
    try {
      const response = await mainApi.post('/house', reqBody, header(token))
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default HouseService
