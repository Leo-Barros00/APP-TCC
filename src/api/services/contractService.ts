import { mainApi } from '@Api/index'
import { AxiosError } from 'axios'
import { Contract } from 'src/typings'

class ContractService {
  public static async sendContract(req: Contract) {
    try {
      const response = await mainApi.post('/contract/send', req)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }

  public static async getContracts(req: Contract) {
    try {
      const response = await mainApi.get('/contract')

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default ContractService
