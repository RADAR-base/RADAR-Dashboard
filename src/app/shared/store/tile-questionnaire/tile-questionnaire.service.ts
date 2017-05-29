import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { Categorical } from '../../models/categorical.model'
import { ErrorService } from '../../services/error.service'

@Injectable()
export class TileQuestionnaireService {

  constructor (private http: Http) {}

  get (): Observable<Categorical[]> {
    // TODO: Change when API is ready
    // return this.http.get(`${PARAMS.API_URI}/questionnaire/avg/UserID_0/SourceID_0`)
    return this.http.get(`${PARAMS.API_LOCAL}/mock-questionnaire.json`)
      .map(res => res.json().dataset || [])
      .map(this.parseQuestionnaireData)
      .catch(ErrorService.handleError)
  }

  parseQuestionnaireData (dataset) {
    return dataset
      .map(data => {
        return {
          name: data.question.name,
          value: data.question.value
        }
      })

  }

}
