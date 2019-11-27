import { Config } from './config'

export const ENV = {
  PROD: false,
  TEST: true,
  TOOLS: true,

  // CONFIG
  CONFIG: Config,

  // API
  API_DOMAIN: 'localhost:8080',
  API_URI: 'http://localhost:8080/api',
  API_LOCAL: 'assets/data',
  API_FIREBASE: 'http://radar-dashboard.firebaseio.com',

  // AUTH API
  AUTH_URI: 'http://localhost:8080/oauth',

  AUTH: {
    grant_type: 'client_credentials',
    client_id: 'radar_dashboard',
    client_secret: '',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ'
  }
}
