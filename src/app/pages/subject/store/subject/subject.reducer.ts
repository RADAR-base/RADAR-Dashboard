import { EntityAdapter, EntityState, createEntityAdapter } from '../../../../../tmp_modules/@ngrx/entity'
import { createSelector } from '@ngrx/store'

import * as subjectActions from './subject.actions'
import { Subject } from '../../models/subject.model'

export interface State {
  studyId: string
  subjectId: string
}

const initialState: State = {
  studyId: '',
  subjectId: ''
}

export function reducer(
  state = initialState,
  action: subjectActions.Actions
): State {
  switch (action.type) {
    case subjectActions.SET_STUDY_ID: {
      return { ...state, studyId: action.payload }
    }

    case subjectActions.SET_SUBJECT_ID: {
      return { ...state, subjectId: action.payload }
    }

    default:
      return state
  }
}

export const getStudyId = (state: State) => state.studyId
export const getSubjectId = (state: State) => state.subjectId
