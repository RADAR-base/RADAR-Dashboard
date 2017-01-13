import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Tile } from '../models/tile.model';
import { ErrorService } from './error.service';

@Injectable()
export class GridService {

  constructor(private http: Http) {}

  get(): Observable<Tile[]> {
    return this.http.get(`${PARAMS.API_LOCAL}/mock-grid.json`)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError);
  }
}
