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

export const getLoading = (state: State) => state.loading
export const getTiles = (state: State) => state.tiles
