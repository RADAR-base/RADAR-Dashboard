import {
  EntityAdapter,
  EntityState,
  Update,
  createEntityAdapter
} from '@ngrx/entity'
import * as shortid from 'shortid'

import { AppConfig } from '../../../shared/app-config'
import { Source } from '../../../shared/models/source.model'
import { Subject } from '../../../shared/models/subject.model'
import * as actions from './sources.actions'

export interface State extends EntityState<Source> {
  isLoaded: boolean
  subject: Subject
}

export const adapter: EntityAdapter<Source> = createEntityAdapter<Source>({
  selectId: state => state.sourceId
})

export const initialState: State = adapter.getInitialState({
  isLoaded: false,
  subject: null
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return { ...state, isLoaded: false }
    }

    case actions.LOAD_SUCCESS: {
      const subject = action.payload
      const sources = subject.sources
      return { ...adapter.addAll(sources, state), subject, isLoaded: true }
    }

    case actions.LOAD_FAIL:
    case actions.DESTROY: {
      return { ...initialState }
    }

    case actions.INJECT_SOURCE_DATA: {
      const sourceTypesEntities = action.payload
      const sourceIds = state.ids as Array<string | number>
      const sourcesWithSourceData = sourceIds.map(id => {
        const source = state.entities[id]
        const sourceData = sourceTypesEntities[
          source.sourceTypeId
        ].sourceData.map(value => {
          const config = AppConfig.config.sourceData[value.sourceDataType]
          return {
            ...value,
            uid: shortid.generate(),
            sourceId: source.sourceId,
            chart: config.chart,
            dataType: config.dataType,
            keys: config.keys,
            label: config.label,
            visible: true
          }
        })

        return {
          ...source,
          sourceData
        }
      })

      return adapter.addAll(sourcesWithSourceData, state)
    }

    case actions.TOGGLE_VISIBILITY: {
      const { sourceDataUid, sourceId } = action.payload
      const source = state.entities[sourceId]
      const sourceData = source.sourceData.map(
        obj =>
          obj.uid === sourceDataUid
            ? { ...obj, visible: !obj.visible }
            : { ...obj }
      )
      const updatedSource: Update<Source> = {
        id: sourceId,
        changes: { ...source, sourceData }
      }

      return adapter.updateOne(updatedSource, state)
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getSubject = (state: State) => state.subject
