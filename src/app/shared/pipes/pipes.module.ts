import { NgModule } from '@angular/core'

import { DateCalcPipe, ShortenLabelPipe } from './pipes'

@NgModule({
  declarations: [DateCalcPipe, ShortenLabelPipe],
  exports: [DateCalcPipe, ShortenLabelPipe]
})
export class PipesModule {}
