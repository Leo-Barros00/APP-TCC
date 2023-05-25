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

  public static async setNewHouse(reqBody: IHouse) {
    try {
      const response = await mainApi.post('/house', {
        ...reqBody,
        ownerId: 'c175bcc5-35db-42c8-a926-423859e84586',
      })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default HouseService
