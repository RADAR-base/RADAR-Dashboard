import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromAuth from './auth.reducer'

export const getAuthState = createFeatureSelector<fromAuth.State>('auth')

export const getUser = createSelector(getAuthState, state => state.user)
export const getToken = createSelector(getAuthState, state => state.token)
export const getIsLoggedIn = createSelector(getAuthState, state => !!state.user)
