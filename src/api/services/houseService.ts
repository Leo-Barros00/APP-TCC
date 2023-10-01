import { AxiosError } from 'axios'

import { mainApi } from '@Api/index'

class HouseService {
  public static async setNewHouse(reqBody: IHouse) {
    try {
      const response = await mainApi.post('/houses', reqBody)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default HouseService
