import '@ngrx/core/add/operator/select'
import { Observable } from 'rxjs/Observable'

import { DashboardTile } from '../../../components/dashboard-tile/dashboard-tile.model'
import * as gridAction from './grid.actions'

export interface State {
  loading: boolean
  tiles: DashboardTile[]
}

const initialState: State = {
  loading: false,
  tiles: []
}

export function reducer (state = initialState, action: gridAction.Actions): State {
  switch (action.type) {

    case gridAction.Types.LOAD: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case gridAction.Types.LOAD_SUCCESS: {
      return {
        loading: false,
        tiles: action.payload
      }
    }

    default:
      return state
  }
}

export function getLoading (state$: Observable<State>) {
  return state$.select(s => s.loading)
}

export function getTiles (state$: Observable<State>) {
  return state$.select(s => s.tiles)
}
