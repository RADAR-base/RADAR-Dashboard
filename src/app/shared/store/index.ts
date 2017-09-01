import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import { environment } from '../../../environments/environment'
import * as fromCompliance from './compliance/compliance.reducer'
import * as fromConfig from './config/config.reducer'
import * as fromSensors from './sensors/sensors.reducer'
import * as fromSource from './source/source.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubject from './subject/subject.reducer'

export interface State {
  config: fromConfig.State
  sensors: fromSensors.State
  source: fromSource.State
  study: fromStudy.State
  subject: fromSubject.State
  compliance: fromCompliance.State
}

export const reducers: ActionReducerMap<State> = {
  config: fromConfig.reducer,
  sensors: fromSensors.reducer,
  source: fromSource.reducer,
  study: fromStudy.reducer,
  subject: fromSubject.reducer,
  compliance: fromCompliance.reducer
}

export const metaReducers: MetaReducer<State>[] = !environment.PROD
  ? [storeFreeze]
  : []

// Config Selectors
export const getConfigState = createFeatureSelector<fromConfig.State>('config')
export const getConfigIsLoaded = createSelector(
  getConfigState,
  fromConfig.getIsLoaded
)

// Study Selectors
export const getStudyState = createFeatureSelector<fromStudy.State>('study')
export const getStudyIsLoaded = createSelector(
  getStudyState,
  fromStudy.getIsLoaded
)
export const getStudyIsLoadedAndValid = createSelector(
  getStudyState,
  fromStudy.getIsLoadedAndValid
)
export const getStudyEntities = createSelector(
  getStudyState,
  fromStudy.getEntities
)
export const getStudySelected = createSelector(
  getStudyState,
  fromStudy.getSelected
)
export const getStudyAll = createSelector(getStudyState, fromStudy.getAll)

// Subject Selectors
export const getSubjectState = createFeatureSelector<fromSubject.State>(
  'subject'
)
export const getSubjectIsLoaded = createSelector(
  getSubjectState,
  fromSubject.getIsLoaded
)
export const getSubjectEntities = createSelector(
  getSubjectState,
  fromSubject.getEntities
)
export const getSubjectAll = createSelector(getSubjectState, fromSubject.getAll)

// Source Selectors
export const getSourceState = createFeatureSelector<fromSource.State>('source')
export const getSourceIsLoaded = createSelector(
  getSourceState,
  fromSource.getIsLoaded
)
export const getSourceEntities = createSelector(
  getSourceState,
  fromSource.getEntities
)
export const getSourceAll = createSelector(getSourceState, fromSource.getAll)

// Sensors Selectors
export const getSensorsState = createFeatureSelector<fromSensors.State>(
  'sensors'
)
export const getSensorsIsLoaded = createSelector(
  getSensorsState,
  fromSensors.getIsLoaded
)

export const getSensorsIsDataLoaded = createSelector(
  getSensorsState,
  fromSensors.getIsDataLoaded
)
export const getSensorsEntities = createSelector(
  getSensorsState,
  fromSensors.getEntities
)

export const getSensorsLabels = createSelector(
  getSensorsState,
  fromSensors.getLabels
)

export const getSensorsAll = createSelector(getSensorsState, fromSensors.getAll)

export const getSensorsData = createSelector(
  getSensorsState,
  fromSensors.getAllData
)

// Source + Sensor Selector
export const getSourceAllWithSensors = createSelector(
  getSourceAll,
  getSensorsAll,
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

// Compliance Selectors
export const getComplianceState = createFeatureSelector<fromCompliance.State>(
  'compliance'
)
export const getComplianceAll = createSelector(
  getComplianceState,
  fromCompliance.getAll
)
export const getComplianceIsLoaded = createSelector(
  getComplianceState,
  fromCompliance.getIsLoaded
)
