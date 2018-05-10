import * as fromRouter from '@ngrx/router-store'
import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import { ENV } from '../../environments/environment'
import { RouterStateUrl } from '../shared/utils/custom-router-state-serializer'

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer
}

export const metaReducers: MetaReducer<{}>[] = !ENV.PROD ? [storeFreeze] : []

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router')

export const getRouterUrl = createSelector(getRouterState, router => {
  return router && router.state && router.state.url
})

export const getRouterParams = createSelector(getRouterState, router => {
  return router && router.state && router.state.params
})
