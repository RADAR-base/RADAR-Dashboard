import { Config } from './config'

export const ENV = {
  PROD: false,
  TEST: false,
  TOOLS: false,

  // CONFIG
  CONFIG: Config,

  // API
  API_DOMAIN: '',
  API_URI: '/api',
  API_FIREBASE: '/api',
  API_LOCAL: '/api',

  // AUTH API
  AUTH_URI: 'https://radar-backend.co.uk/managementportal/oauth',
  AUTH: {
    grant_type: 'authorization_code',
    client_id: 'radar_dashboard',
    client_secret: '',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ',
    redirect_uri: 'http://localhost:4200/login'
  }
}
