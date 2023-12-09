import { AxiosError } from 'axios'
import { mainApi } from '@Api/index'
import { Avaliation } from 'src/typings'


class AvaliationService {

    public static async sendAvaliation(req: Avaliation) {
        try {
          const response = await mainApi.post('/avaliation/send', req)
          return response.data
        } catch (error) {
          if (error instanceof AxiosError) return error.response?.data
        }
      }

    public static async getAllAvaliation() {
      try {
        const response = await mainApi.get('/userAvaliation')        
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) return error.response?.data
      }
    }
  }
    
  

  export default AvaliationService


