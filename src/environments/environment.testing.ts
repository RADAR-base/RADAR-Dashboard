import { Config } from './config'

export const ENV = {
  PROD: false,
  TEST: true,
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
    grant_type: 'client_credentials',
    client_id: 'radar_dashboard',
    client_secret: 'says_PRETTY_smiled',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ'
  }
}
