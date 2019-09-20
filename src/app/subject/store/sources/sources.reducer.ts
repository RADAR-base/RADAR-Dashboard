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
    case actions.LOAD:
    case actions.LOAD_FAIL:
    case actions.DESTROY: {
      return initialState
    }

    case actions.LOAD_SUCCESS: {
      const subject = action.payload
      const sources = subject.sources
      return { ...adapter.addAll(sources, state), subject, isLoaded: true }
    }

    case actions.INJECT_SOURCE_DATA: {
      const sourceTypesEntities = action.payload
      const sourceIds = state.ids as Array<string | number>
      const sourcesWithSourceData = sourceIds.map(id => {
        const source = state.entities[id]
        const sourceType = sourceTypesEntities[source.sourceTypeId]
        const sourceData = sourceType.sourceData.length
          ? sourceType.sourceData.map(value => {
              const config =
                AppConfig.config.sourceData[value.sourceDataType] || null

              if (config === null) {
                console.warn(
                  `⚠️ the sourceDataType: "${value.sourceDataType}" dashboard configuration has not been set in "environments/config.ts". Please add it and open a PR with the changes in https://github.com/RADAR-base/RADAR-Dashboard/`
                )
              }

              return {
                ...value,
                uid: shortid.generate(),
                sourceId: source.sourceId,
                chart: config && config.chart,
                keys: config && config.keys,
                label: config && config.label,
                visible: true
              }
            })
          : null

        if (!sourceData) {
          console.warn(
            `⚠️ the sourceData is empty in sourceType { id:"${sourceType.id}", model: "${sourceType.model}", producer:"${sourceType.producer}", catalogVersion:"${sourceType.catalogVersion}" }`
          )
        }

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
      const sourceData = source.sourceData.map(obj =>
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
