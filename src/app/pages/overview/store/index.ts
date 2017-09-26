import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromOverview from './overview.reducer'

export interface State {
  overview: fromOverview.State
}

export const reducers = fromOverview.reducer

export const getStudyState = createFeatureSelector<fromOverview.State>(
  'overview'
)
export const getStudiesLoaded = createSelector(
  getStudyState,
  fromOverview.getStudiesLoaded
)

export const getStudiesIds = createSelector(
  getStudyState,
  fromOverview.getStudiesIds
)
export const getStudiesById = createSelector(
  getStudyState,
  fromOverview.getStudiesById
)
export const getStudies = createSelector(getStudyState, fromOverview.getStudies)
