import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <md-toolbar>
      <img class="radar-logo" src="assets/radar-logo.svg" alt="RADAR-CNS Logo">
      <div>
        <div class="font-body-light">RADAR-CNS</div>
        <div class="font-title">Mental Health</div>
      </div>
      <span class="toolbar-filler"></span>
      <button class="icon-button">
        <i class="material-icons">more_vert</i>
      </button>
    </md-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
