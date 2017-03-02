import * as userAction from './user.actions'
import { User } from './user.model'

export interface State extends User {
  loading: boolean
  id: string
  lastUpdate: string
}

const initialState: State = {
  loading: false,
  id: null,
  lastUpdate: null
}

export function reducer (state = initialState, action: userAction.Actions): State {
  switch (action.type) {

    case userAction.Types.LOAD: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case userAction.Types.LOAD_SUCCESS: {
      const user = action.payload

      return {
        loading: false,
        id: user.id,
        lastUpdate: user.lastUpdate
      }
    }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getUserID = (state: State) => state.id
