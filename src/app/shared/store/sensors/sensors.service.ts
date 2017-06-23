import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Sensor } from './sensors.model'

@Injectable()
export class SensorsService {

  constructor () {}

  getAll (d): Observable<Sensor[]> {
    console.log(d)

    return Observable.of([])

    // return this.http.get(url)
    // .map(res => {
    //   return res.status === 200
    //     ? res.json() || []
    //     : []
    // })
    // .map(res => [])
    // .catch(ErrorService.handleError)
  }

}
