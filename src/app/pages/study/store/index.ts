import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromCompliance from './compliance/compliance.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubject from './subject/subject.reducer'

export interface State {
  study: fromStudy.State
  subject: fromSubject.State
  compliance: fromCompliance.State
}

export const reducers = {
  study: fromStudy.reducer,
  subject: fromSubject.reducer,
  compliance: fromCompliance.reducer
}

export const getStudyPageState = createFeatureSelector<State>('study-page')

// Study Selectors
export const getStudyState = createSelector(
  getStudyPageState,
  state => state.study
)

export const { selectAll: getEntities } = fromStudy.adapter.getSelectors(
  getStudyState
)

export const getStudyIsLoaded = createSelector(
  getStudyState,
  fromStudy.getIsLoaded
)

export const getId = createSelector(getStudyState, fromStudy.getSelectedId)

export const getStudyIsLoadedAndValid = createSelector(
  getStudyIsLoaded,
  getEntities,
  getId,
  (loaded, entities, selectedId) => {
    return loaded && !!entities[selectedId]
  }
)

export const getSelected = createSelector(
  getEntities,
  fromStudy.getSelectedId,
  (entities, id) => entities[id]
)

// Subject Selectors
export const getSubjectState = createSelector(
  getStudyPageState,
  state => state.subject
)

export const getSubjectsLoaded = createSelector(
  getSubjectState,
  fromSubject.getIsLoaded
)

export const { selectAll: getSubjects } = fromSubject.adapter.getSelectors(
  getSubjectState
)

// Compliance Selectors
export const getComplianceState = createSelector(
  getStudyPageState,
  state => state.compliance
)

export const getComplianceDataLoaded = createSelector(
  getComplianceState,
  fromCompliance.getIsLoaded
)

export const getComplianceData = createSelector(
  getComplianceState,
  fromCompliance.getData
)
