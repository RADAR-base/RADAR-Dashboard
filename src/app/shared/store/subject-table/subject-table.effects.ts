import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx'

import * as subjectTableAction from './subject-table.actions'
import { SubjectTableService } from './subject-table.service'

@Injectable()
export class SubjectTableEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(subjectTableAction.GET_ALL)
    .map(toPayload)
    .mergeMap(payload => {
      return this.subjectTableService.getAll(payload.subjectid,payload.sourceid,payload.type)
        .map((data: any) => new subjectTableAction.GetAllSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private subjectTableService: SubjectTableService
  ) {}
}
