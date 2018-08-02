import { NgModule } from '@angular/core'

import { DateCalcPipe } from './pipes'

@NgModule({
  declarations: [DateCalcPipe],
  exports: [DateCalcPipe]
})
export class PipesModule {}
