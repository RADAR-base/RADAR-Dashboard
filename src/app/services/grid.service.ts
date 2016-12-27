import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../shared/app.config';
import { Tile } from '../models/tile.model';
import { ErrorService } from './error.service';

@Injectable()
export class GridService {

  constructor(private http: Http) {}

  get(): Observable<Tile[]> {
    return this.http.get(`${AppConfig.API_PATH}/mock-grid.json`)
      .delay(2000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError);
  }
}
