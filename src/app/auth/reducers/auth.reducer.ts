import { Action } from '@ngrx/store'

import { AuthActionTypes, AuthActions } from '../actions/auth.actions'
import { User } from '../models/user'

export interface State {
  token: string
  user: User | null
  isLoggedIn: boolean
}

export const initialState: State = {
  token: '',
  user: null,
  isLoggedIn: false
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login:
      return state

    default:
      return state
  }
}
