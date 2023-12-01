import { AxiosError } from 'axios'
import { mainApi } from '@Api/index'
import { object } from 'yup';

class ProviderService {
  public static async getProvidersByHouse(
    houseId: string,
    startDate: Date,
    workHours: string
  ) {
    try {
      const response = await mainApi.get(
        `/users/providers?houseId=${houseId}&startDate=${startDate}&workHours=${workHours}`
      )
      const providers = response.data.providers.map((provider)=>{
        let averageRating = 0;
        if(provider.avaliations.length > 0){
          averageRating = provider.avaliations.reduce((acc, avaliation) => {
            return acc + Number(avaliation.number);
          }, 0) / provider.avaliations.length;
          
        }
        return {...provider,averageRating}
      })   
   
      return {providers}
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default ProviderService
