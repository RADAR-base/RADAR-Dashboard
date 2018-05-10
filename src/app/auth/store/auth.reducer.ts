import { Action, createFeatureSelector, createSelector } from '@ngrx/store'

import { User } from '../models/user'
import { AuthActionTypes, AuthActions } from './auth.actions'

export interface State {
  token: string
  user: User | null
}

export const initialState: State = {
  token: '',
  user: null
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login:
      return state

    default:
      return state
  }
}

// SELECTORS
export const getAuthState = createFeatureSelector<State>('auth')

export const getUser = createSelector(getAuthState, state => state.user)
export const getToken = createSelector(getAuthState, state => state.token)
export const getIsLoggedIn = createSelector(getAuthState, state => !!state.user)
