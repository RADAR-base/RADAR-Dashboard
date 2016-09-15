import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: `
    <div class="item-title font-small">{{title}}</div>
    <div class="item-content"></div>
  `,
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  title: String = 'TITLE';

  constructor() { }

  ngOnInit() {
  }

}
