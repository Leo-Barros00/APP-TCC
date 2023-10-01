import { AxiosError } from 'axios'

import { mainApi, authApi } from '@Api/index'

import { SignUpState } from '@Store/reducers/signUp'

class UserService {
  public static async signUp(signUpData: SignUpState) {
    try {
      const response = await mainApi.post('/users', signUpData)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError)
        return {
          ...error.response?.data,
          status: 'error',
        }
    }
  }

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

  public static async getAllProviders(authToken: string) {
    try {
      const response = await mainApi.get('/users/providers', {
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

  public static async getLoggedUser() {
    try {
      const response = await mainApi.get('/users/loggedUser')
      return response.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  }
}

export default UserService
