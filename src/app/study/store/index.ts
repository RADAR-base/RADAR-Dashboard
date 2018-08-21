import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromRoot from '../../store'
import * as fromStudies from '../../studies/store/studies.reducer'
import * as fromCompliance from './compliance-data/compliance-data.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubjects from './subjects/subjects.reducer'

export interface State {
  study: fromStudy.State
  subjects: fromSubjects.State
  compliance: fromCompliance.State
}

export const reducers = {
  study: fromStudy.reducer,
  subjects: fromSubjects.reducer,
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

// Subjects Selectors
export const getSubjectsState = createSelector(
  getStudyFeatureState,
  state => state.subjects
)
export const getSubjectsLoaded = createSelector(
  getSubjectsState,
  fromSubjects.getIsLoaded
)
export const {
  selectIds: getSubjectsByIds,
  selectEntities: getSubjectsEntities,
  selectAll: getSubjects
} = fromSubjects.adapter.getSelectors(getSubjectsState)

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

export const getComplianceDataTimeFrame = createSelector(
  getComplianceState,
  fromCompliance.getTimeFrame
)
