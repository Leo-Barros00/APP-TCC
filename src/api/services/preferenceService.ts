import { AxiosError } from 'axios'

import { mainApi } from '@Api/index'

class PreferenceService {
  public static async savePreferences(preferences: any) {
    try {
      const response = await mainApi.put('/users/preferences', preferences)
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

export default PreferenceService
