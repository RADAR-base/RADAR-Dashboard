import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `
    <md-toolbar>
      <img class="radar-logo" src="assets/radar-logo.svg" alt="RADAR-CNS Logo">
      <div>
        <div class="font-body-light">RADAR-CNS</div>
        <div class="font-title">Mental Health</div>
      </div>
      <span class="app-toolbar-filler"></span>
      <button class="app-icon-button">
        <i class="material-icons">more_vert</i>
      </button>
    </md-toolbar>
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
