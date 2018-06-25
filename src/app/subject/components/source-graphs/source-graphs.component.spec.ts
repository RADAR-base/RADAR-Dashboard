import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../store'
import * as fromFeature from '../../store'
import { SourceGraphsComponent } from './source-graphs.component'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [SourceGraphsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceGraphsComponent)
    component = fixture.componentInstance

    component.sensorsData = []
    component.dates = []
    component.sources = []

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
