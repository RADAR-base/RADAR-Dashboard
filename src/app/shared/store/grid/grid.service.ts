import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { DashboardTile } from '../../../components/dashboard-tile/dashboard-tile.model'
import { ErrorService } from '../../services/error.service'

@Injectable()
export class GridService {

  constructor (private http: Http) {}

  get (): Observable<DashboardTile[]> {
    return this.http.get(`${PARAMS.API_LOCAL}/mock-grid.json`)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }
}
