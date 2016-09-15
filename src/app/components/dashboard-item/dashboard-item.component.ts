import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: `
    <div class="item-title font-small">{{item.title}}</div>
    <div class="item-content"></div>
  `,
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
