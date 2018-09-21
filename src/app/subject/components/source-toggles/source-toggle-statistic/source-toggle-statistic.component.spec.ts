import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../../store'
import * as fromFeature from '../../../store'
import { SourceToggleStatisticComponent } from './source-toggle-statistic.component'

describe('SourceToggleStatisticComponent', () => {
  let component: SourceToggleStatisticComponent
  let fixture: ComponentFixture<SourceToggleStatisticComponent>
  let element: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [SourceToggleStatisticComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceToggleStatisticComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should change statistic on click', () => {
    fixture.detectChanges()

    const evt = new MouseEvent('click', {})
    element.querySelector('mat-option').dispatchEvent(evt)

    expect(component.selectedStatistic.toLowerCase).toBe(
      element.querySelector('mat-option').innerHTML.toLowerCase
    )
  })
})
