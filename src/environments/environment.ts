import { Config } from './config'

export const ENV = {
  PROD: false,
  TEST: false,
  TOOLS: false,

  // CONFIG
  CONFIG: Config,

  // API
  API_DOMAIN: 'radar-backend.co.uk',
  API_URI: 'https://radar-backend.co.uk/api',
  API_FIREBASE: 'https://radar-dashboard.firebaseio.com',
  API_LOCAL: 'assets/data',

  // AUTH API
  AUTH_URI: 'https://radar-backend.co.uk/managementportal/oauth',
  AUTH: {
    grant_type: 'authorization_code',
    client_id: 'radar_dashboard',
    client_secret: 'says_PRETTY_smiled',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ'
  }
}
