import { Dictionary } from '@ngrx/entity/src/models'
import { createFeatureSelector, createSelector } from '@ngrx/store'

import { SourceData } from '../../shared/models/source-data.model'
import { SensorsData } from '../models/sensors-data.model'
import * as fromSensorsData from './sensors-data/sensors-data.reducer'
import * as fromSources from './sources/sources.reducer'

export interface State {
  sources: fromSources.State
  sensorsData: fromSensorsData.State
}

export const reducers = {
  sources: fromSources.reducer,
  sensorsData: fromSensorsData.reducer
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
      ? sourcesData.reduce(
          (acc, sourceData) => ({ ...acc, [sourceData.uid]: sourceData }),
          {}
        )
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

    return ids.filter(d => sourcesDataEntities[d].visible).reduce((acc, id) => {
      const index =
        sensorsDataEntities[id].data &&
        sensorsDataEntities[id].data.findIndex(
          d => d.date.getTime() === date.getTime()
        )

      return [
        ...acc,
        {
          id: id,
          label: sourcesDataEntities[id].label,
          dataType: sourcesDataEntities[id].dataType,
          keys: sourcesDataEntities[id].keys || null,
          value:
            sensorsDataEntities[id] && index > -1
              ? sensorsDataEntities[id].data[index].value
              : null
        }
      ]
    }, [])
  }
)
