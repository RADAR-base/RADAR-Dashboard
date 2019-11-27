import { User } from './user'

export interface AuthResponse {
  access_token: string
  expires_in: number
  iat: number
  iss: string
  jti: string
  token_type: string
  sub: string
  roles: string[]
}

export interface AuthData {
  token: string
  user: User
}
