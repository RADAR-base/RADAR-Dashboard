import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `
    <app-toolbar></app-toolbar>
    <div class="app-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

  }
}
