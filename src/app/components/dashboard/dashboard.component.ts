import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: `
    <app-dashboard-item *ngFor="let item of items" [item]="item"></app-dashboard-item>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Item[];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.items = this.dashboardService.getItems();
  }
}
