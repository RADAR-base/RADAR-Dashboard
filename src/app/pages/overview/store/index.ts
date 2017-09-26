import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromStudy from './study/study.reducer'

export interface State {
  study: fromStudy.State
}

export const reducers = fromStudy.reducer

export const getStudyState = createFeatureSelector<fromStudy.State>('overview')

export const getStudiesLoaded = createSelector(
  getStudyState,
  fromStudy.getIsLoaded
)

export const { selectAll: getStudies } = fromStudy.adapter.getSelectors(
  getStudyState
)
