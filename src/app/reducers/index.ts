import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';

import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { Observable } from 'rxjs';

import * as fromGrid from './grid';
import * as fromUser from './user';
import * as fromChartHR from './charts/heart-rate';

export interface State {
  grid: fromGrid.State;
  user: fromUser.State;
  chartHR: fromChartHR.State;
}

const reducers = {
  grid: fromGrid.reducer,
  user: fromUser.reducer,
  chartHR: fromChartHR.reducer,
};

const developmentReducer: ActionReducer<State> =
  compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> =
  combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Grid Selectors
export function getGridState(state$: Observable<State>) {
  return state$.select(state => state.grid);
}

export const getGridLoading = compose(fromGrid.getLoading, getGridState);
export const getGridLoaded = compose(fromGrid.getLoaded, getGridState);
export const getGridTiles = compose(fromGrid.getTiles, getGridState);

// User Selectors
export function getUserState(state$: Observable<State>) {
  return state$.select(state => state.user);
}

export const getUserLoaded = compose(fromUser.getLoaded, getUserState);
export const getUserLoading = compose(fromUser.getLoading, getUserState);
export const getUserID = compose(fromUser.getUserID, getUserState);

// ChartHR Selectors
export function getChartHRState(state$: Observable<State>) {
  return state$.select(state => state.chartHR);
}

export const getChartHRLoaded = compose(fromChartHR.getLoaded, getChartHRState);
export const getChartHRLoading = compose(fromChartHR.getLoading, getChartHRState);
export const getChartHRData = compose(fromChartHR.getData, getChartHRState);
