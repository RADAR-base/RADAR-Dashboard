import { createSelector } from '@ngrx/store'

import * as sensorsTooltip from './sensors-tooltip.actions'

export interface State {
  date: any
  data: any
  isLoaded: boolean
}

const initialState: State = {
  date: '',
  data: [],
  isLoaded: false
}

export function reducer(
  state = initialState,
  action: sensorsTooltip.Actions
): State {
  switch (action.type) {
    case sensorsTooltip.GET_ALL: {
      return Object.assign({}, state, {
        isLoaded: false
      })
    }

    case sensorsTooltip.GET_ALL_SUCCESS: {
      const payload = action.payload
      const entities = payload.entities
      const data = payload.data.values
      const dates = payload.data.dates
      const filteredData = []

      const date = new Date(payload.date)
      const seconds = Math.round(date.getSeconds() / 10) * 10
      date.setSeconds(seconds)
      date.setMilliseconds(0)

      const visibleIds = Object.keys(entities).filter(
        d => entities[d].visible === true
      )

      visibleIds.map(function(d) {
        let value = {}
        const index = dates.findIndex(k => k.getTime() === date.getTime())
        if (!data[d].keys[0]) {
          value = data[d][index] ? { value: data[d][index] } : { value: null }
        } else {
          value = {
            value: data[d].keys.map(k => {
              return { [k.key]: data[d].values[k.key][index] }
            })
          }
        }
        const label = entities[d].label
        const source = entities[d].source
        const valueWithLabel = { ...value, label, source }
        filteredData[d] = valueWithLabel
      })

      return Object.assign({}, state, {
        date: date,
        data: filteredData,
        isLoaded: true
      })
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getData = (state: State) => state.data

export const getAll = createSelector(getData, data => {
  return data
})
