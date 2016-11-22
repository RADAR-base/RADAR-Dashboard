import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Tile } from '../models/tile';
import { Observable } from 'rxjs';

@Injectable()
export class GridService {
  // TODO: move to a static class
  private API_PATH: string = 'assets/data';

  constructor(private http: Http) {}

  getTiles(): Observable<Tile[]> {
    return this.http.get(`${this.API_PATH}/mock-grid.json`)
      .delay(2000)
      .map(res => res.json().tiles || []);
  }
}
