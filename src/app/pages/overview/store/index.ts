import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromStudy from './study/study.reducer'

export interface StudyState {
  study: fromStudy.State
}

export interface State {
  study: StudyState
}

export const reducers = { study: fromStudy.reducer }

export const getOverviewState = createFeatureSelector<StudyState>(
  'overview-page'
)

// Study Selectors
export const getStudyState = createSelector(
  getOverviewState,
  state => state.study
)

export const getStudiesLoaded = createSelector(
  getStudyState,
  fromStudy.getIsLoaded
)

export const { selectAll: getStudies } = fromStudy.adapter.getSelectors(
  getStudyState
)
