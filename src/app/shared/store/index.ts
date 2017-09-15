import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'

import * as fromCompliance from './compliance/compliance.reducer'
import * as fromSensors from './sensors/sensors.reducer'
import * as fromSource from './source/source.reducer'
import * as fromStudy from './study/study.reducer'
import * as fromSubject from './subject/subject.reducer'

export interface State {
  sensors: fromSensors.State
  source: fromSource.State
  study: fromStudy.State
  subject: fromSubject.State
  compliance: fromCompliance.State
}

export const reducers: ActionReducerMap<State> = {
  sensors: fromSensors.reducer,
  source: fromSource.reducer,
  study: fromStudy.reducer,
  subject: fromSubject.reducer,
  compliance: fromCompliance.reducer
}

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
export const getStudySelectedId = createSelector(
  getStudyState,
  fromStudy.getSelectedId
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
export const getSubjectSelected = createSelector(
  getSubjectState,
  fromSubject.getSelected
)
export const getSubjectSelectedId = createSelector(
  getSubjectState,
  fromSubject.getSelectedId
)

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
export const getSensorsIds = createSelector(getSensorsState, fromSensors.getIds)
export const getSensorsEntities = createSelector(
  getSensorsState,
  fromSensors.getEntities
)
export const getSensorsDates = createSelector(
  getSensorsState,
  fromSensors.getDates
)
export const getSensors = createSelector(
  getSensorsState,
  fromSensors.getSensors
)
export const getSensorsData = createSelector(
  getSensorsState,
  fromSensors.getData
)
export const getSensorsTimeFrame = createSelector(
  getSensorsState,
  fromSensors.getTimeFrame
)
export const getSensorsTimeInterval = createSelector(
  getSensorsState,
  fromSensors.getTimeInterval
)
export const getSensorsDescriptiveStatistic = createSelector(
  getSensorsState,
  fromSensors.getDescriptiveStatistic
)
export const getSensorsTooltipValues = createSelector(
  getSensorsState,
  fromSensors.getTooltipValues
)

// Source + Sensor Selector
export const getSourceAllWithSensors = createSelector(
  getSourceAll,
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

// Compliance Selectors
export const getComplianceState = createFeatureSelector<fromCompliance.State>(
  'compliance'
)
export const getComplianceData = createSelector(
  getComplianceState,
  fromCompliance.getData
)
export const getComplianceIsLoaded = createSelector(
  getComplianceState,
  fromCompliance.getIsLoaded
)
