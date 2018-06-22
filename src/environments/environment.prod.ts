import { Config } from './config'

export const ENV = {
  PROD: true,
  TEST: false,
  TOOLS: false,

  // CONFIG
  CONFIG: Config,

  // API
  API_DOMAIN: 'radar-cns-platform.rosalind.kcl.ac.uk',
  API_URI: 'https://radar-cns-platform.rosalind.kcl.ac.uk/api',
  API_LOCAL: 'assets/data',
  API_FIREBASE: 'https://radar-dashboard.firebaseio.com',

  // AUTH API
  AUTH_URI:
    'https://radar-cns-platform.rosalind.kcl.ac.uk/managementportal/oauth/token',
  AUTH: {
    grant_type: 'client_credentials',
    client_id: 'radar_dashboard',
    client_secret: 'says_PRETTY_smiled',
    scope:
      'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ MEASUREMENT.READ'
  }
}
