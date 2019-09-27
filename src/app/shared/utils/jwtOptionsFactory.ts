import { ENV } from '../../../environments/environment'
import { AuthService } from '../../auth/services/auth.service'

export function jwtOptionsFactory() {
  return {
    tokenGetter: AuthService.getToken,
    whitelistedDomains: ['localhost', ENV.SETTINGS.API_DOMAIN],
    blacklistedRoutes: [ENV.SETTINGS.API_FIREBASE + '/config.json']
  }
}
