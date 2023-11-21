import { AxiosError } from 'axios'
import { mainApi } from '@Api/index'

class WithdrawService {
  static basePath = '/withdraw'

  public static async withdrawValue(withdrawValue: number) {
    try {
      const response = await mainApi.post(this.basePath, { withdrawValue })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError)
        return {
          ...error.response?.data,
          status: 'error',
        }
    }
  }
}

export default WithdrawService
