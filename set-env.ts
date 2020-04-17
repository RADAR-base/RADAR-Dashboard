import { writeFile } from 'fs'

declare var require

// Configure Angular `environment.ts` file path
const targetPath = 'src/environments/environment.prod.ts'
// Load node modules
const colors = require('colors')
require('dotenv').config()
// `environment.ts` file structure
const envConfigFile = `
import { Config } from './config'

export const ENV = {
    PROD: '${process.env.PROD}',
    TEST: '${process.env.TEST}',
    TOOLS: '${process.env.TOOLS}',
    CONFIG: Config,
    API_DOMAIN: '${process.env.API_DOMAIN}',
    API_URI: '${process.env.API_URI}',
    API_LOCAL: '${process.env.API_LOCAL}',
    API_FIREBASE: '${process.env.API_FIREBASE}',
    AUTH_URI: '${process.env.AUTH_URI}',
    AUTH: {
      grant_type: '${process.env.GRANT_TYPE}',
      client_id: '${process.env.CLIENT_ID}',
      client_secret: '${process.env.CLIENT_SECRET}',
    },
    USER: '${process.env.USER}',
    PASS: '${process.env.PASS}',
};
`
console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
)
console.log(colors.grey(envConfigFile))
writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    throw console.error(err)
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    )
  }
})
