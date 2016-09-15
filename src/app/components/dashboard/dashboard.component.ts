import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: `
    <app-dashboard-item></app-dashboard-item>
    <app-dashboard-item></app-dashboard-item>
    <app-dashboard-item></app-dashboard-item>
    <app-dashboard-item></app-dashboard-item>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
