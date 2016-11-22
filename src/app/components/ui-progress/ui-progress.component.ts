import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-progress',
  template: `
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  `,
  styleUrls: ['./ui-progress.component.scss']
})
export class UIProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
