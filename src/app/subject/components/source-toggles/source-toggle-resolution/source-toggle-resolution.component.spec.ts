import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromFeature from '../../../store'
import { SourceToggleResolutionComponent } from './source-toggle-resolution.component'

describe('SourceToggleResolutionComponent', () => {
  let component: SourceToggleResolutionComponent
  let fixture: ComponentFixture<SourceToggleResolutionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [SourceToggleResolutionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceToggleResolutionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
