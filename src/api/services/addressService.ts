import { AxiosError } from 'axios'

import { mainApi } from '@Api/index'

class AddressService {
  public static async getAllStateData() {
    try {
      const response = await mainApi.get('/address/states')
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default AddressService
