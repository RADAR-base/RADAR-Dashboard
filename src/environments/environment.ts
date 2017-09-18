// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev ENV which uses `ENV.ts`, but if you do
// `ng build --env=prod` then `ENV.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const ENV = {
  PROD: false,
  TOOLS: false,
  PARAMS: {
    API_URI: 'https://radar-cns.ddns.net/api',
    API_LOCAL: 'assets/data',
    API_FIREBASE: 'https://radar-dashboard.firebaseio.com'
  }
}
