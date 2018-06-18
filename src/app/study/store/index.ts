import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromRoot from '../../store'
import * as fromStudies from '../../studies/store/studies.reducer'
import * as fromCompliance from './compliance-data/compliance-data.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubject from './subjects/subjects.reducer'

export interface State {
  study: fromStudy.State
  subjects: fromSubject.State
  compliance: fromCompliance.State
}

export const reducers = {
  study: fromStudy.reducer,
  subjects: fromSubject.reducer,
  compliance: fromCompliance.reducer
}

export const getStudyFeatureState = createFeatureSelector<State>('study')

// Study Selectors
export const getStudyState = createSelector(
  getStudyFeatureState,
  state => state.study
)
export const getStudyIsLoaded = createSelector(
  getStudyState,
  fromStudy.getIsLoaded
)
export const getStudy = createSelector(getStudyState, fromStudy.getSelected)

// FromStudies + Router Selectors
export const getStudyFromStudies = createSelector(
  fromStudies.getStudyEntities,
  fromRoot.getRouterParamsStudyName,
  (studies, studyName) => studies[studyName]
)

// Subject Selectors
export const getSubjectState = createSelector(
  getStudyFeatureState,
  state => state.subjects
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
  getStudyFeatureState,
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
