import { Component } from '@angular/core'

@Component({
  selector: 'app-progress-animation',
  template: `
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  `,
  styleUrls: ['./progress-animation.component.scss']
})
export class ProgressAnimationComponent {}
