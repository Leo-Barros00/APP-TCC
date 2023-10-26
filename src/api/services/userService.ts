import { AxiosError } from 'axios'
import FormData from 'form-data'
import mime from 'mime'

import { mainApi, authApi } from '@Api/index'

import { SignUpState } from '@Store/reducers/signUp'

function getFormattedImageUri(uri: string) {
  return 'file:///' + uri.split('file:/').join('')
}

class UserService {
  public static async signUp(signUpData: SignUpState) {
    try {
      const formData = new FormData()

      const documentImageUri = getFormattedImageUri(signUpData.documentImage)
      const personImageUri = getFormattedImageUri(signUpData.personImage)

      formData.append('documentImage', {
        uri: documentImageUri,
        type: mime.getType(documentImageUri),
        name: documentImageUri.split('/').pop(),
      })
      formData.append('personImage', {
        uri: personImageUri,
        type: mime.getType(personImageUri),
        name: personImageUri.split('/').pop(),
      })

      for (let key in signUpData) {
        formData.append(key, String(signUpData[key as keyof SignUpState]))
      }

      const response = await mainApi.post('/users', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
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
