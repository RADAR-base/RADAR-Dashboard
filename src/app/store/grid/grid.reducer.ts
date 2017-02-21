import '@ngrx/core/add/operator/select'
import { Observable } from 'rxjs/Observable'
import * as gridAction from './grid.actions'
import { Tile } from '../../models/tile.model'

export interface State {
  loading: boolean
  tiles: Tile[]
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
