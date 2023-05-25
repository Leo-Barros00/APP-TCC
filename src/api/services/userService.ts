import { AxiosError } from 'axios'

import mainApi, { authApi } from '@Api/index'

class UserService {
  public static async signIn(email: string, password: string) {
    try {
      const response = await authApi.post('/login', { email, password })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError)
        return {
          ...error.response?.data,
          status: 'error',
        }
    }
  }

  public static async refreshToken(token: string, refreshToken: string) {
    try {
      const response = await authApi.post(
        '/refresh',
        { RefreshToken: refreshToken },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError)
        return {
          ...error.response?.data,
          status: 'error',
        }
    }
  }

  public static async savePreferences(preferences: any, authToken: string) {
    try {
      const response = await mainApi.put('/users/preferences', preferences, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
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

export default UserService
