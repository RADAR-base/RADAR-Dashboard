import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../tmp_modules/@ngrx/entity'
import { Sensor } from '../../../shared/models/sensor.model'
import * as actions from './sensors.actions'

export interface State extends EntityState<Sensor> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Sensor> = createEntityAdapter<Sensor>()

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return { ...state, isLoaded: false }
    }

    case actions.LOAD_SUCCESS: {
      let counter = 0
      action.payload.map(source =>
        source.sensors.map(sensor => {
          const id = counter++

          return (state = adapter.addOne(
            {
              ...sensor,
              visible: true,
              source: source.id,
              id
            },
            state
          ))
        }, {})
      )

      return { ...state, isLoaded: true }
    }

    case actions.TOGGLE_VISIBILITY: {
      const id = action.payload

      return adapter.updateOne(
        { id: id, changes: { visible: !state.entities[id].visible } },
        state
      )
    }

    case actions.DESTROY: {
      return { ...initialState }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
