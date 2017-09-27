import { createSelector } from '@ngrx/store'

import * as subjectActions from './subject.actions'
import { Subject } from '../../models/subject.model'

export interface State {
  id: string
  studyId: string
}

const initialState: State = {
  id: '',
  studyId: ''
}

export function reducer(
  state = initialState,
  action: subjectActions.Actions
): State {
  switch (action.type) {
    case subjectActions.SET_STUDY_ID: {
      return { ...state, studyId: action.payload }
    }

    case subjectActions.SET_ID: {
      return { ...state, id: action.payload }
    }

    default:
      return state
  }
}

export const getStudyId = (state: State) => state.studyId
export const getId = (state: State) => state.id
