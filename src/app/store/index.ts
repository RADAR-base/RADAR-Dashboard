import * as fromRouter from '@ngrx/router-store'
import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import { ENV } from '../../environments/environment'
import { CustomRouterState } from '../shared/utils/custom-router-state-serializer'
import * as fromSourceTypes from './source-types/source-types.reducer'

export interface State {
  router: fromRouter.RouterReducerState<CustomRouterState>
  sourceTypes: fromSourceTypes.State
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  sourceTypes: fromSourceTypes.reducer
}

export const metaReducers: MetaReducer<{}>[] = !ENV.PROD ? [storeFreeze] : []

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<CustomRouterState>
>('router')

export const getRouterUrl = createSelector(
  getRouterState,
  router => router && router.state.url
)

export const getRouterParams = createSelector(
  getRouterState,
  router => router && router.state.params
)

export const getRouterParamsStudyName = createSelector(
  getRouterState,
  (router): string => router && router.state.params['studyName']
)

export const getRouterParamsSubjectId = createSelector(
  getRouterState,
  (router): string => router && router.state.params['subjectId']
)

export const getSourceTypesState = createFeatureSelector<fromSourceTypes.State>(
  'sourceTypes'
)

export const {
  selectIds: getSourceTypesIds,
  selectEntities: getSourceTypesEntities,
  selectAll: getSourceTypesAll,
  selectTotal: getSourceTypesTotal
} = fromSourceTypes.adapter.getSelectors(getSourceTypesState)
