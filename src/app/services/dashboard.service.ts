import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable()
export class DashboardService {
  items: Item[] = [
    {
      id: 1,
      title: 'Title 1',
      type: 'status'
    },
    {
      id: 2,
      title: 'Title 2',
      type: 'chart-donut'
    },
    {
      id: 3,
      title: 'Title 3',
      type: 'chart-bar'
    },
    {
      id: 4,
      title: 'Title 4',
      type: 'chart-histogram'
    }
  ];

  constructor() { }

  getItems(): Item[] {
    return this.items;
  }

}
