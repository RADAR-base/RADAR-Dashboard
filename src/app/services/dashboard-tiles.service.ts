import { Injectable } from '@angular/core';
import { Tile } from '../models/tile';

@Injectable()
export class DashboardTilesService {
  items: Tile[] = [
    {
      id: 1,
      rows: 2,
      cols: 3,
      title: 'Heart Rate Monitoring',
      type: 'heart-rate'
    },
    {
      id: 2,
      rows: 1,
      cols: 1,
      title: 'TBD',
      type: 'empty'
    },
    {
      id: 3,
      rows: 1,
      cols: 1,
      title: 'TBD',
      type: 'empty'
    },
    {
      id: 4,
      rows: 1,
      cols: 2,
      title: 'TBD',
      type: 'empty'
    },
    {
      id: 5,
      rows: 1,
      cols: 2,
      title: 'TBD',
      type: 'empty'
    }
  ];

  constructor() { }

  getItems(): Tile[] {
    return this.items;
  }

}
