import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProgressAnimationComponent } from './progress-animation.component'

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressAnimationComponent],
  exports: [ProgressAnimationComponent]
})
export class ProgressAnimationModule {}
