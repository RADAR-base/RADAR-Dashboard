import { Config } from './config'

export const ENV = {
  PROD: false,
  TEST: false,
  TOOLS: true,

  // CONFIG
  CONFIG: Config,

  // API
  API_DOMAIN: 'radar-backend.co.uk',
  API_URI: 'https://radar-backend.co.uk/api',
  API_LOCAL: 'assets/data',
  API_FIREBASE: 'https://radar-dashboard.firebaseio.com',

  // AUTH API
  AUTH_URI: 'https://radar-backend.co.uk/managementportal/oauth/token',
  AUTH: {
    grant_type: 'client_credentials',
    client_id: 'radar_dashboard',
    client_secret: 'says_PRETTY_smiled',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ'
  }
}
