import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromSensorsData from './sensors-data/sensors-data.reducer'
import * as fromSensors from './sensors/sensors.reducer'
import * as fromSources from './sources/sources.reducer'
import * as fromSubject from './subject/subject.reducer'

export interface State {
  subject: fromSubject.State
  sources: fromSources.State
  sensors: fromSensors.State
  sensorsData: fromSensorsData.State
}

export const reducers = {
  subject: fromSubject.reducer,
  sources: fromSources.reducer,
  sensors: fromSensors.reducer,
  sensorsData: fromSensorsData.reducer
}

export const getSubjectPageState = createFeatureSelector<State>('subjectPage')

// Subject Selectors
export const getSubjectState = createSelector(
  getSubjectPageState,
  state => state.subject
)

export const getStudyId = createSelector(
  getSubjectState,
  fromSubject.getStudyId
)

export const getSubjectId = createSelector(getSubjectState, fromSubject.getId)

// Sensors Selectors
export const getSensorsState = createSelector(
  getSubjectPageState,
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
  getSubjectPageState,
  state => state.sources
)
export const { selectAll: getSources } = fromSources.adapter.getSelectors(
  getSourcesState
)

export const getSourcesLoaded = createSelector(
  getSourcesState,
  fromSources.getIsLoaded
)

export const getSourcesWithSensors = createSelector(
  getSources,
  getSensors,
  (sources, sensors) => {
    if (sensors.length) {
      const sensorsBySource = sources.reduce((acc, source) => {
        return { ...acc, [source.id]: [] }
      }, {})

      sensors.map(sensor => {
        sensorsBySource[sensor.source].push(sensor)
      })

      return sources.map(source => {
        return { ...source, sensors: sensorsBySource[source.id] }
      })
    }
  }
)

// Sensors Data Selectors
export const getSensorsDataState = createSelector(
  getSubjectPageState,
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
    if (!date) return []

    return ids.reduce((acc, id) => {
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
