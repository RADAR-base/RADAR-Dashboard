import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromSensorsData from './sensors-data/sensors-data.reducer'
import * as fromSensors from './sensors/sensors.reducer'
import * as fromSources from './sources/sources.reducer'

export interface State {
  sources: fromSources.State
  sensors: fromSensors.State
  sensorsData: fromSensorsData.State
}

export const reducers = {
  sources: fromSources.reducer,
  sensors: fromSensors.reducer,
  sensorsData: fromSensorsData.reducer
}

export const getSubjectFeatureState = createFeatureSelector<State>('subject')

// Sensors Selectors
export const getSensorsState = createSelector(
  getSubjectFeatureState,
  state => state.sensors
)
export const {
  selectEntities: getSensorsEntities,
  selectAll: getSensors
} = fromSensors.adapter.getSelectors(getSensorsState)

export const getSensorsLoaded = createSelector(
  getSensorsState,
  fromSensors.getIsLoaded
)

// Sources Selectors
export const getSourcesState = createSelector(
  getSubjectFeatureState,
  state => state.sources
)
export const { selectAll: getSources } = fromSources.adapter.getSelectors(
  getSourcesState
)

export const getSourcesLoaded = createSelector(
  getSourcesState,
  fromSources.getIsLoaded
)

export const getSourcesSubject = createSelector(
  getSourcesState,
  fromSources.getSubject
)

export const getSourcesWithSensors = createSelector(
  getSources,
  getSensors,
  (sources, sensors) => {
    if (sensors.length) {
      const sensorsBySource = sources.reduce((acc, source) => {
        return { ...acc, [source.sourceId]: [] }
      }, {})

      sensors.map(sensor => {
        sensorsBySource[sensor.source].push(sensor)
      })

      return sources.map(source => {
        return { ...source, sensors: sensorsBySource[source.sourceId] }
      })
    }
  }
)

// Sensors Data Selectors
export const getSensorsDataState = createSelector(
  getSubjectFeatureState,
  state => state.sensorsData
)
export const {
  selectIds: getSensorsDataIds,
  selectEntities: getSensorsDataEntities,
  selectAll: getSensorsData
} = fromSensorsData.adapter.getSelectors(getSensorsDataState)

export const getSensorsDataLoaded = createSelector(
  getSensorsDataState,
  fromSensorsData.getIsDataLoaded
)

export const getSensorsDates = createSelector(
  getSensorsDataState,
  fromSensorsData.getDates
)

export const getTooltipDate = createSelector(
  getSensorsDataState,
  fromSensorsData.getTooltipDate
)

export const getSensorsTimeFrame = createSelector(
  getSensorsDataState,
  fromSensorsData.getTimeFrame
)

export const getSensorsTimeInterval = createSelector(
  getSensorsDataState,
  fromSensorsData.getTimeInterval
)

export const getSensorsDescriptiveStatistic = createSelector(
  getSensorsDataState,
  fromSensorsData.getDescriptiveStatistic
)

export const getSensorsTooltipValues = createSelector(
  getSensorsDataIds,
  getSensorsEntities,
  getSensorsDataEntities,
  getTooltipDate,
  (ids: (number | string)[], sensors, sensorsEntities, date) => {
    if (!date) {
      return []
    }

    return ids.filter(d => sensors[d].visible).reduce((acc, id) => {
      const index =
        sensorsEntities[id].data &&
        sensorsEntities[id].data.findIndex(
          d => d.date.getTime() === date.getTime()
        )

      return [
        ...acc,
        {
          id: id,
          label: sensors[id].label,
          dataType: sensors[id].dataType,
          keys: sensors[id].keys || null,
          value:
            sensorsEntities[id] && index > -1
              ? sensorsEntities[id].data[index].value
              : null
        }
      ]
    }, [])
  }
)
