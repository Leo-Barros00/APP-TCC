export interface Token {
  value: string
  expiresIn: number
}

export interface AuthObject {
  isLogged: boolean
  token: Token | null
  refreshToken: Token | null
}
