import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromFeature from '../../../store'
import { SourceGraphsModule } from '../source-graphs.module'
import { SourceVolumeComponent } from './source-volume.component'

describe('SourceVolumeComponent', () => {
  let component: SourceVolumeComponent
  let fixture: ComponentFixture<SourceVolumeComponent>

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
    fixture = TestBed.createComponent(SourceVolumeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
