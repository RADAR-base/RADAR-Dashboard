import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';

import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { Observable } from 'rxjs';

import * as fromGrid from './grid/grid.reducer';
import * as fromUser from './user/user.reducer';
import * as fromConfig from './config/config.reducer';
import * as fromChartHR from './chart-heart-rate/chart-heart-rate.reducer';

export interface State {
  grid: fromGrid.State;
  user: fromUser.State;
  config: fromConfig.State;
  chartHR: fromChartHR.State;
}

const reducers = {
  grid: fromGrid.reducer,
  user: fromUser.reducer,
  config: fromConfig.reducer,
  chartHR: fromChartHR.reducer,
};

const developmentReducer: ActionReducer<State> =
  compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> =
  combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.PROD) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Grid Selectors
export function getGridState(state$: Observable<State>) {
  return state$.select(s => s.grid);
}
export const getGridLoading = compose(fromGrid.getLoading, getGridState);
export const getGridTiles = compose(fromGrid.getTiles, getGridState);

// User Selectors
export function getUserState(state$: Observable<State>) {
  return state$.select(s => s.user);
}
export const getUserLoading = compose(fromUser.getLoading, getUserState);
export const getUserID = compose(fromUser.getUserID, getUserState);

// Config Selectors
export function getConfigState(state$: Observable<State>) {
  return state$.select(s => s.config);
}
export const getConfigLoading = compose(fromConfig.getLoading, getConfigState);
export const getConfigDescriptiveStatistic =
  compose(fromConfig.getDescriptiveStatistic, getConfigState);

// ChartHR Selectors
export function getChartHRState(state$: Observable<State>) {
  return state$.select(s => s.chartHR);
}
export const getChartHRLoading = compose(fromChartHR.getLoading, getChartHRState);
export const getChartHRData = compose(fromChartHR.getData, getChartHRState);
