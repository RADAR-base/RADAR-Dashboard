import { compose } from '@ngrx/core/compose'
import { ActionReducer, combineReducers } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { createSelector } from 'reselect'

import { environment } from '../../../environments/environment'
import * as fromConfig from './config/config.reducer'
import * as fromGrid from './grid/grid.reducer'
import * as fromChartAC from './tile-acceleration/tile-acceleration.reducer'
import * as fromChartHR from './tile-heart-rate/tile-heart-rate.reducer'
import * as fromChartQuestionnaire from './tile-questionnaire/tile-questionnaire.reducer'
import * as fromChartSteps from './tile-steps/tile-steps.reducer'
import * as fromUser from './user/user.reducer'
import * as fromStudy from './study/study.reducer'

export interface State {
  study: fromStudy.State
  grid: fromGrid.State
  user: fromUser.State
  config: fromConfig.State
  chartHR: fromChartHR.State
  chartAC: fromChartAC.State
  chartSteps: fromChartSteps.State
  chartQuestionnaire: fromChartQuestionnaire.State
}

const reducers = {
  study: fromStudy.reducer,
  grid: fromGrid.reducer,
  user: fromUser.reducer,
  config: fromConfig.reducer,
  chartHR: fromChartHR.reducer,
  chartAC: fromChartAC.reducer,
  chartSteps: fromChartSteps.reducer,
  chartQuestionnaire: fromChartQuestionnaire.reducer
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

/**
 * OLD SELECTORS
 * TODO: Delete old selectors
 */
// Grid Selectors
export const getGridState = (state: State) => state.grid
export const getGridLoading = createSelector(getGridState, fromGrid.getLoading)
export const getGridTiles = createSelector(getGridState, fromGrid.getTiles)

// User Selectors
export const getUserState = (state: State) => state.user
export const getUserLoading = createSelector(getUserState, fromUser.getLoading)
export const getUserID = createSelector(getUserState, fromUser.getUserID)

// Config Selectors
export const getConfigState = (state: State) => state.config
export const getConfigLoading = createSelector(getConfigState, fromConfig.getLoading)
export const getConfigDescriptiveStatistic =
  createSelector(getConfigState, fromConfig.getDescriptiveStatistic)

// ChartHR Selectors
export const getChartHRState = (state: State) => state.chartHR
export const getChartHRLoading = createSelector(getChartHRState, fromChartHR.getLoading)
export const getChartHRData = createSelector(getChartHRState, fromChartHR.getData)

// ChartAC Selectors
export const getChartACState = (state: State) => state.chartAC
export const getChartACLoading = createSelector(getChartACState, fromChartAC.getLoading)
export const getChartACData = createSelector(getChartACState, fromChartAC.getData)

// ChartSteps Selectors
export const getChartStepsState = (state: State) => state.chartSteps
export const getChartStepsLoading = createSelector(getChartStepsState, fromChartSteps.getLoading)
export const getChartStepsData = createSelector(getChartStepsState, fromChartSteps.getData)

// ChartQuestionnaire Selectors
export const getChartQuestionnaireState = (state: State) => state.chartQuestionnaire
export const getChartQuestionnaireLoading =
  createSelector(getChartQuestionnaireState, fromChartQuestionnaire.getLoading)
export const getChartQuestionnaireData =
  createSelector(getChartQuestionnaireState, fromChartQuestionnaire.getData)
