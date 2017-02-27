import '@ngrx/core/add/operator/select'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/let'
import { compose } from '@ngrx/core/compose'
import { ActionReducer, combineReducers } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { Observable } from 'rxjs/Observable'

import { environment } from '../../../environments/environment'
import * as fromConfig from './config/config.reducer'
import * as fromGrid from './grid/grid.reducer'
import * as fromChartAC from './tile-acceleration/tile-acceleration.reducer'
import * as fromChartHR from './tile-heart-rate/tile-heart-rate.reducer'
import * as fromChartQuestionnaire from './tile-questionnaire/tile-questionnaire.reducer'
import * as fromChartSteps from './tile-steps/tile-steps.reducer'
import * as fromUser from './user/user.reducer'

export interface State {
  grid: fromGrid.State
  user: fromUser.State
  config: fromConfig.State
  chartHR: fromChartHR.State
  chartAC: fromChartAC.State
  chartSteps: fromChartSteps.State
  chartQuestionnaire: fromChartQuestionnaire.State
}

const reducers = {
  grid: fromGrid.reducer,
  user: fromUser.reducer,
  config: fromConfig.reducer,
  chartHR: fromChartHR.reducer,
  chartAC: fromChartAC.reducer,
  chartSteps: fromChartSteps.reducer,
  chartQuestionnaire: fromChartQuestionnaire.reducer
}

const developmentReducer: ActionReducer<State> =
        compose(storeFreeze, combineReducers)(reducers)
const productionReducer: ActionReducer<State> =
        combineReducers(reducers)

export function reducer (state: any, action: any) {
  if (environment.PROD) {
    return productionReducer(state, action)
  } else {
    return developmentReducer(state, action)
  }
}

// Grid Selectors
export function getGridState (state$: Observable<State>) {
  return state$.select(s => s.grid)
}
export const getGridLoading = compose(fromGrid.getLoading, getGridState)
export const getGridTiles = compose(fromGrid.getTiles, getGridState)

// User Selectors
export function getUserState (state$: Observable<State>) {
  return state$.select(s => s.user)
}
export const getUserLoading = compose(fromUser.getLoading, getUserState)
export const getUserID = compose(fromUser.getUserID, getUserState)

// Config Selectors
export function getConfigState (state$: Observable<State>) {
  return state$.select(s => s.config)
}
export const getConfigLoading = compose(fromConfig.getLoading, getConfigState)
export const getConfigDescriptiveStatistic =
               compose(fromConfig.getDescriptiveStatistic, getConfigState)

// ChartHR Selectors
export function getChartHRState (state$: Observable<State>) {
  return state$.select(s => s.chartHR)
}
export const getChartHRLoading = compose(fromChartHR.getLoading, getChartHRState)
export const getChartHRData = compose(fromChartHR.getData, getChartHRState)

// ChartAC Selectors
export function getChartACState (state$: Observable<State>) {
  return state$.select(s => s.chartAC)
}
export const getChartACLoading = compose(fromChartAC.getLoading, getChartACState)
export const getChartACData = compose(fromChartAC.getData, getChartACState)

// ChartSteps Selectors
export function getChartStepsState (state$: Observable<State>) {
  return state$.select(s => s.chartSteps)
}
export const getChartStepsLoading = compose(fromChartSteps.getLoading, getChartStepsState)
export const getChartStepsData = compose(fromChartSteps.getData, getChartStepsState)

// ChartQuestionnaire Selectors
export function getChartQuestionnaireState (state$: Observable<State>) {
  return state$.select(s => s.chartQuestionnaire)
}
export const getChartQuestionnaireLoading
               = compose(fromChartQuestionnaire.getLoading, getChartQuestionnaireState)
export const getChartQuestionnaireData
               = compose(fromChartQuestionnaire.getData, getChartQuestionnaireState)
