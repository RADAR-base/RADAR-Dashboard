import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../../../shared/store'
import { DeviceStatusComponent } from './device-status.component'
import { SubjectTableModule } from '../../subject-table/subject-table.module'

describe('DeviceStatusComponent', () => {
  let component: DeviceStatusComponent
  let fixture: ComponentFixture<DeviceStatusComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceStatusComponent
      ],
      imports: [
        SubjectTableModule,
        StoreModule.provideStore(reducer)
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
