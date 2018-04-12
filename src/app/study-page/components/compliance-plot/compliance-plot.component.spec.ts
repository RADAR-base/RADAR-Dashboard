import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { MockConfig } from '../../../shared/testing/mocks/mock-config'
import { CompliancePlotComponent } from './compliance-plot.component'
import { CompliancePlotModule } from './compliance-plot.module'

describe('CompliancePlotComponent', () => {
  let component: CompliancePlotComponent
  let fixture: ComponentFixture<CompliancePlotComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CompliancePlotModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancePlotComponent)
    component = fixture.componentInstance
    component.keys = MockConfig.config.compliance.keys
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
