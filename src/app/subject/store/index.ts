import { Dictionary } from '@ngrx/entity/src/models'
import { createFeatureSelector, createSelector } from '@ngrx/store'

import { SensorsData } from '../../shared/models/sensors-data.model'
import { SourceData } from '../../shared/models/source-data.model'
import * as fromSensorsData from './sensors-data/sensors-data.reducer'
import * as fromSourceTypes from './source-types/source-types.reducer'
import * as fromSources from './sources/sources.reducer'
import * as fromVolumeData from './volume-data/volume-data.reducer'

export interface State {
  sources: fromSources.State
  sensorsData: fromSensorsData.State
  sourceTypes: fromSourceTypes.State
  volumeData: fromVolumeData.State
}

export const reducers = {
  sources: fromSources.reducer,
  sensorsData: fromSensorsData.reducer,
  sourceTypes: fromSourceTypes.reducer,
  volumeData: fromVolumeData.reducer
}

export const getSubjectFeatureState = createFeatureSelector<State>('subject')

// Sources Selectors
export const getSourcesState = createSelector(
  getSubjectFeatureState,
  state => state.sources
)
export const {
  selectIds: getSourcesIds,
  selectEntities: getSourcesEntities,
  selectAll: getSources
} = fromSources.adapter.getSelectors(getSourcesState)

export const getSourcesData = createSelector(getSources, sources => {
  return sources.length && sources[0].sourceData
    ? sources.reduce((acc, source) => [...acc, ...source.sourceData], [])
    : null
})

export const getSourcesDataEntities = createSelector(
  getSourcesData,
  sourcesData => {
    return sourcesData && sourcesData.length
      ? sourcesData.reduce((acc, sourceData) => {
          return sourceData !== null
            ? { ...acc, [sourceData.uid]: sourceData }
            : { ...acc }
        }, {})
      : null
  }
)

export const getSourcesLoaded = createSelector(
  getSourcesState,
  fromSources.getIsLoaded
)

export const getSourcesSubject = createSelector(
  getSourcesState,
  fromSources.getSubject
)

// SourceTypes Selectors
export const getSourceTypesState = createSelector(
  getSubjectFeatureState,
  state => state.sourceTypes
)

export const {
  selectIds: getSourceTypesIds,
  selectEntities: getSourceTypesEntities,
  selectAll: getSourceTypesAll,
  selectTotal: getSourceTypesTotal
} = fromSourceTypes.adapter.getSelectors(getSourceTypesState)

// SensorsData Selectors
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

export const getSensorsDataDates = createSelector(
  getSensorsDataState,
  fromSensorsData.getDates
)

export const getSensorsDataTooltipDate = createSelector(
  getSensorsDataState,
  fromSensorsData.getTooltipDate
)

export const getSensorsDataTimeFrame = createSelector(
  getSensorsDataState,
  fromSensorsData.getTimeFrame
)

export const getSensorsDataTimeInterval = createSelector(
  getSensorsDataState,
  fromSensorsData.getTimeInterval
)

export const getSensorsDataDescriptiveStatistic = createSelector(
  getSensorsDataState,
  fromSensorsData.getDescriptiveStatistic
)

export const getSensorsDataTooltipValues = createSelector(
  getSensorsDataIds,
  getSensorsDataEntities,
  getSourcesDataEntities,
  getSensorsDataTooltipDate,
  (
    ids: string[],
    sensorsDataEntities: Dictionary<SensorsData>,
    sourcesDataEntities: Dictionary<SourceData>,
    date
  ) => {
    if (!date) {
      return []
    }

    return ids
      .filter(
        id =>
          sensorsDataEntities[id] &&
          sensorsDataEntities[id].data &&
          sensorsDataEntities[id].chart &&
          sourcesDataEntities &&
          sourcesDataEntities[id] &&
          sourcesDataEntities[id].visible
      )
      .reduce((acc, id) => {
        const sensorData = sensorsDataEntities[id] || null
        const index = sensorData.data.findIndex(
          d => d.date.getTime() === date.getTime()
        )
        const value = index > -1 ? sensorData.data[index].value : null

        return [
          ...acc,
          {
            id: id,
            label: sensorData.label || null,
            dataType: sensorData.chart.dataType || null,
            keys: sensorData.keys || null,
            value
          }
        ]
      }, [])
  }
)

// VolumeData Selectors
export const getVolumeDataState = createSelector(
  getSubjectFeatureState,
  state => state.volumeData
)
export const {
  selectIds: getVolumeDataIds,
  selectEntities: getVolumeDataEntities,
  selectAll: getVolumeData
} = fromVolumeData.adapter.getSelectors(getVolumeDataState)

export const getVolumeDataLoaded = createSelector(
  getVolumeDataState,
  fromVolumeData.getIsDataLoaded
)

export const getVolumeDataTimeFrame = createSelector(
  getVolumeDataState,
  fromVolumeData.getTimeFrame
)

export const getVolumeDataPrevTimeFrame = createSelector(
  getVolumeDataState,
  fromVolumeData.getPrevTimeFrame
)

export const getVolumeDataTimeInterval = createSelector(
  getVolumeDataState,
  fromVolumeData.getTimeInterval
)

export const getVolumeDataPrevTimeInterval = createSelector(
  getVolumeDataState,
  fromVolumeData.getPrevTimeInterval
)

export const getVolumeDataDescriptiveStatistic = createSelector(
  getVolumeDataState,
  fromVolumeData.getDescriptiveStatistic
)

export const getVolumeDataHasLoadFailed = createSelector(
  getVolumeDataState,
  fromVolumeData.getHasLoadFailed
)

export const getVolumeDataHasTimeFrameChanged = createSelector(
  getVolumeDataState,
  fromVolumeData.getHasTimeFrameChanged
)

export const getVolumeDataFormatted = createSelector(
  getVolumeDataIds,
  getVolumeDataEntities,
  (ids: string[], volumeDataEntities: Dictionary<any>) => {
    return ids.map(function(d) {
      return {
        value: volumeDataEntities[d].data.value,
        date: new Date(volumeDataEntities[d].data.startDateTime)
      }
    })
  }
)
