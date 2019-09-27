import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { ENV } from './environments/environment'
import { environmentLoader as environmentLoaderPromise } from './environments/environmentLoader'

environmentLoaderPromise.then(env => {
  if (env.PROD) {
    enableProdMode()
  }

  ENV.SETTINGS = env.SETTINGS

  platformBrowserDynamic().bootstrapModule(AppModule)
})
