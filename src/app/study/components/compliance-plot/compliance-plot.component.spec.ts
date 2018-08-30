import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockComplianceDataExpected } from '../../../shared/testing/mocks/mock-compliance-data'
import { CompliancePlotComponent } from './compliance-plot.component'
import { CompliancePlotModule } from './compliance-plot.module'

describe('CompliancePlotComponent', () => {
  let component: CompliancePlotComponent
  let fixture: ComponentFixture<CompliancePlotComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompliancePlotModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(CompliancePlotComponent)
    component = fixture.componentInstance

    component.data = MockComplianceDataExpected
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })
})
