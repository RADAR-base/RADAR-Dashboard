import * as sourcesActions from './sources.actions'
import * as fromSources from './sources.reducer'

describe('SourcesReducer', () => {
  describe('Load Success action', () => {
    it('should return', () => {
      const { initialState } = fromSources
      const subject = {
        subjectId: 'hi',
        sources: [],
        status: '',
        humanReadableId: 'hi',
        projectName: 'hello',
        lastSeen: '2017-05-01'
      }
      const action = new sourcesActions.LoadSuccess(subject)
      const state = fromSources.reducer(initialState, action)

      expect(state.entities[0]).toBeUndefined()
    })
  })

  describe('Toggle Visibility action', () => {
    it('visiblity should be false when initially true', () => {
      const payload = {
        sourceDataUid: 'KFJL1',
        sourceId: 'fedd672e-959a-11e8-9eb6-529269fb1459'
      }
      const { initialState } = fromSources
      initialState.entities = {
        'fedd672e-959a-11e8-9eb6-529269fb1459': {
          sourceId: 'fedd672e-959a-11e8-9eb6-529269fb1459',
          sourceName: 'A003C9',
          sourceTypeId: 10855,
          sourceTypeProducer: 'EMPATICA',
          sourceTypeModel: 'E4',
          sourceTypeCatalogVersion: '1.0.0',
          assigned: true,
          status: 'DISCONNECTED',
          effectiveTimeFrame: {
            startDateTime: new Date('2000-01-01T00:00:00Z'),
            endDateTime: new Date('2000-01-01T00:10:00Z')
          },
          sourceData: [
            {
              id: 10101,
              visible: true,
              uid: 'KFJL1',
              sourceDataType: '',
              sourceDataName: ''
            }
          ]
        }
      }
      const action = new sourcesActions.ToggleVisibility(payload)
      const state = fromSources.reducer(initialState, action)

      expect(state.entities).toBeTruthy()
      expect(state.entities[payload.sourceId].sourceData[0].visible).toBeFalsy()
    })
  })

  describe('Inject SourceData action', () => {
    it('should inject sourcedata to source entities', () => {
      const payload = {
        10304: {
          canRegisterDynamically: true,
          id: 10304,
          sourceData: [
            { id: 509, sourceDataName: 'asd', sourceDataType: 'as' }
          ],
          producer: 'producer',
          model: 'model',
          catalogVersion: '1.0',
          sourceTypeScope: 'PASSIVE'
        }
      }
      const { initialState } = fromSources
      initialState.ids = ['gjkd09']
      initialState.entities = {
        gjkd09: {
          sourceId: 'gjkd09',
          sourceTypeId: 10304,
          sourceName: 'asd-gjkd09',
          sourceTypeProducer: 'producer',
          sourceTypeModel: 'model',
          sourceTypeCatalogVersion: '1.0',
          assigned: true,
          status: 'DISCONNECTED',
          effectiveTimeFrame: null
        }
      }
      const action = new sourcesActions.InjectSourceData(payload)
      const state = fromSources.reducer(initialState, action)

      expect(state.entities[initialState.ids[0]].sourceData).toBeTruthy()
    })
  })
})
