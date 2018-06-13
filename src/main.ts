import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { ENV } from './environments/environment'

if (ENV.PROD) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
