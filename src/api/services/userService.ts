import { AxiosError } from 'axios'

import api from '@Api/index'

class UserService {
    public static async signIn(email: string, password: string) {
        try {
            const response = await api.post('/users/signIn', {email, password})
            console.log({ response })
            return response.data
          } catch (error) {
            if (error instanceof AxiosError) return error.response?.data
          }    
    }
}

export default UserService