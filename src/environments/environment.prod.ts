export const ENV = {
  PROD: true,
  TEST: false,
  TOOLS: false,
  PARAMS: {
    API_URI: 'https://radar-backend.co.uk/api',
    API_LOCAL: 'assets/data',
    API_FIREBASE: 'https://radar-dashboard.firebaseio.com'
  },
  AUTH_URI: 'https://radar-backend.co.uk/managementportal/oauth/token',
  AUTH: {
    grant_type: 'client_credentials',
    client_id: 'radar_dashboard',
    client_secret: 'says_PRETTY_smiled',
    scope: 'SOURCETYPE.READ PROJECT.READ SOURCE.READ SUBJECT.READ'
  }
}
