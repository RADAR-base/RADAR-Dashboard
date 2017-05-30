import { compose } from '@ngrx/core/compose'
import { ActionReducer, combineReducers } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { createSelector } from 'reselect'

import { environment } from '../../../environments/environment'
import * as fromConfig from './config/config.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubject from './subject/subject.reducer'
import * as fromSource from './source/source.reducer'

export interface State {
  study: fromStudy.State
  subject: fromSubject.State
  source: fromSource.State
  config: fromConfig.State
}

const reducers = {
  study: fromStudy.reducer,
  subject: fromSubject.reducer,
  source: fromSource.reducer,
  config: fromConfig.reducer
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers)
const productionReducer: ActionReducer<State> = combineReducers(reducers)

export function reducer (state: any, action: any) {
  if (environment.PROD) {
    return productionReducer(state, action)
  } else {
    return developmentReducer(state, action)
  }
}

// Config Selectors
export const getConfigState = (state: State) => state.config
export const getConfigLoading = createSelector(getConfigState, fromConfig.getLoading)
export const getConfigDescriptiveStatistic =
  createSelector(getConfigState, fromConfig.getDescriptiveStatistic)

// Study Selectors
export const getStudyState = (state: State) => state.study
export const getStudyIsLoading = createSelector(getStudyState, fromStudy.getIsLoading)
export const getStudyIsLoaded = createSelector(getStudyState, fromStudy.getIsLoaded)
export const getStudyEntities = createSelector(getStudyState, fromStudy.getEntities)
export const getStudyAll = createSelector(getStudyState, fromStudy.getAll)

// Subject Selectors
export const getSubjectState = (state: State) => state.subject
export const getSubjectIsLoading = createSelector(getSubjectState, fromSubject.getIsLoading)
export const getSubjectIsLoaded = createSelector(getSubjectState, fromSubject.getIsLoaded)
export const getSubjectEntities = createSelector(getSubjectState, fromSubject.getEntities)
export const getSubjectAll = createSelector(getSubjectState, fromSubject.getAll)

// Source Selectors
export const getSourceState = (state: State) => state.source
export const getSourceIsLoading = createSelector(getSourceState, fromSource.getIsLoading)
export const getSourceIsLoaded = createSelector(getSourceState, fromSource.getIsLoaded)
