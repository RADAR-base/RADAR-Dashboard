import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'
import { DebugElement } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { CompliancePlotComponent } from './compliance-plot.component'
import { CompliancePlotModule } from './compliance-plot.module'
import { reducers } from '../../shared/store'

import { MockComplianceData } from '../../shared/testing/mocks/mock-compliance-data'

describe('CompliancePlotComponent', () => {
  let component: CompliancePlotComponent
  let fixture: ComponentFixture<CompliancePlotComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CompliancePlotModule, StoreModule.forRoot(reducers)]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancePlotComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
