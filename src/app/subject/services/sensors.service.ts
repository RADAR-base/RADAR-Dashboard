import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { SourceData } from '../../shared/models/source-data.model'
import { SourceType } from '../../shared/models/source-type.model'
import { Source } from '../../shared/models/source.model'

@Injectable()
export class SensorsService {
  constructor(private http: HttpClient) {}

  // addSourceData(sources: Source[]): Observable<Source[]> {
  //   console.log(sources)
  //   return of(
  //     sources.map((source: Source) => {
  //       const sensorSpecs = AppConfig.config.specs[source.sourceTypeProducer]
  //       const sensors = sensorSpecs.map(sensor => ({
  //         ...AppConfig.config.sensors[sensor],
  //         type: sensor
  //       }))
  //       return sensors ? { ...source, sensors } : source
  //     })
  //   )
  // }

  // addSourceData(sources: Source[]): Observable<Source[]> {
  //   console.log('addSourceData', sources)
  //   return of(
  //     sources.map((source: Source) => {
  //       this.getSourceData(source)
  //     })
  //   )
  // }

  getSourceData(source: Source) {
    const url =
      `${ENV.API_URI}/source-types/` +
      `${source.sourceTypeProducer}/` +
      `${source.sourceTypeModel}/` +
      `${source.sourceTypeCatalogVersion}/`

    return this.http.get<SourceType>(url).pipe(
      tap(console.log),
      map((sourceType: SourceType) => {
        return {
          sourceId: source.sourceId,
          sourceData: sourceType.sourceData
        }
      })
    )
  }
}
