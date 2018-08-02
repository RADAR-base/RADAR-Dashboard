import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromFeature from '../../../store'
import { SourceGraphsModule } from '../source-graphs.module'
import { SourceVolumeTimeFrameComponent } from './source-volume-timeframe.component'

describe('SourceVolumeTimeFrameComponent', () => {
  let component: SourceVolumeTimeFrameComponent
  let fixture: ComponentFixture<SourceVolumeTimeFrameComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SourceGraphsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVolumeTimeFrameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
