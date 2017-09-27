import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromStudies from './studies/studies.reducer'

export interface StudiesState {
  study: fromStudies.State
}

export interface State {
  study: StudiesState
}

export const reducers = { study: fromStudies.reducer }

export const getOverviewState = createFeatureSelector<StudiesState>(
  'overviewPage'
)

// Studies Selectors
export const getStudiesState = createSelector(
  getOverviewState,
  state => state.study
)

export const getStudiesIsLoaded = createSelector(
  getStudiesState,
  fromStudies.getIsLoaded
)

export const { selectAll: getStudies } = fromStudies.adapter.getSelectors(
  getStudiesState
)
