import * as actions from './subject.actions'

export interface State {
  id: string
  studyId: string
}

const initialState: State = {
  id: '',
  studyId: ''
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.SET_STUDY_ID: {
      return { ...state, studyId: action.payload }
    }

    case actions.SET_ID: {
      return { ...state, id: action.payload }
    }

    default:
      return state
  }
}

export const getStudyId = (state: State) => state.studyId
export const getId = (state: State) => state.id
