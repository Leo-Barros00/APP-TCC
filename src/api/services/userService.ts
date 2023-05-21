import { AxiosError } from 'axios'

import { authApi } from '@Api/index'

class UserService {
  public static async signIn(email: string, password: string) {
    try {
      const response = await authApi.post('/login', { email, password })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data
    }
  }
}

export default UserService
