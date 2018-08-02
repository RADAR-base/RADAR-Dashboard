import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../store'
import * as fromFeature from '../../store'
import { SourceTogglesComponent } from './source-toggles.component'

describe('SourceTogglesComponent', () => {
  let component: SourceTogglesComponent
  let fixture: ComponentFixture<SourceTogglesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [SourceTogglesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceTogglesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
