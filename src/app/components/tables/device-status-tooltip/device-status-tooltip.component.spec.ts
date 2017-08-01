import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DeviceStatusTooltipComponent } from './device-status-tooltip.component'
import { MdePopoverModule } from '@material-extended/mde'
import { DebugElement } from '@angular/core'

import { SubjectTableModule } from '../subject-table/subject-table.module'

describe('DeviceStatusTooltipComponent', () => {
  let component: DeviceStatusTooltipComponent
  let fixture: ComponentFixture<DeviceStatusTooltipComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SubjectTableModule,
        MdePopoverModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusTooltipComponent)
    component = fixture.componentInstance
    component.subjectId = 'MRC03'
    component.sources = []
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
