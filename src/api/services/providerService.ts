import { AxiosError } from 'axios'

import { mainApi } from '@Api/index'

class ProviderService {
  public static async getProvidersByHouse(houseId: string) {
    try {
      const response = await mainApi.get(`/users/providers?houseId=${houseId}`)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default ProviderService
