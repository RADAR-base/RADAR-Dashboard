import { compose } from '@ngrx/core/compose'
import { ActionReducer, combineReducers } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { createSelector } from 'reselect'

import { environment } from '../../../environments/environment'
import * as fromConfig from './config/config.reducer'
import * as fromStudy from './study/study.reducer'

export interface State {
  study: fromStudy.State
  config: fromConfig.State
}

const reducers = {
  study: fromStudy.reducer,
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

// Study Selectors
export const getStudyState = (state: State) => state.study
export const getStudyIsLoading = createSelector(getStudyState, fromStudy.getIsLoading)
export const getStudyIsLoaded = createSelector(getStudyState, fromStudy.getIsLoaded)
export const getStudyAll = createSelector(getStudyState, fromStudy.getAll)
export const getStudyEntities = createSelector(getStudyState, fromStudy.getEntities)

// Config Selectors
export const getConfigState = (state: State) => state.config
export const getConfigLoading = createSelector(getConfigState, fromConfig.getLoading)
export const getConfigDescriptiveStatistic =
  createSelector(getConfigState, fromConfig.getDescriptiveStatistic)
