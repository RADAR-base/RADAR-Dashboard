import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'

import * as fromRoot from '../../core/store'
import * as fromAuth from './auth.reducer'

export interface AuthState {
  status: fromAuth.State
}

export interface State {
  status: AuthState
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer
}

export const selectAuthState = createFeatureSelector<AuthState>('auth')
