export interface UserAuth {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  expires_in: number
  iat: number
  iss: string
  jti: string
  token_type: string
}
