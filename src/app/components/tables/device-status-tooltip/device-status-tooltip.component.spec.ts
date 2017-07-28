import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../../shared/store'
import { DeviceStatusTooltipComponent } from './device-status-tooltip.component'
import { SubjectTableModule } from '../subject-table/subject-table.module'

describe('DeviceStatusTooltipComponent', () => {
  let component: DeviceStatusTooltipComponent
  let fixture: ComponentFixture<DeviceStatusTooltipComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceStatusTooltipComponent
      ],
      imports: [
        SubjectTableModule,
        StoreModule.provideStore(reducer)
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusTooltipComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
