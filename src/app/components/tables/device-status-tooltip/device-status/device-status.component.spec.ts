import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'
import { reducer } from '../../../../shared/store'
import { DeviceStatusComponent } from './device-status.component'
import { DebugElement } from '@angular/core'

import { SubjectTableModule } from '../../subject-table/subject-table.module'

describe('DeviceStatusComponent', () => {
  let component: DeviceStatusComponent
  let fixture: ComponentFixture<DeviceStatusComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    // const activatedRoute = new ActivatedRouteStub()
    // activatedRoute.testParams = { studyId: '0', patientId: 'MRC02' }

    TestBed.configureTestingModule({
      imports: [
        SubjectTableModule,
        StoreModule.provideStore(reducer)
      ]
    })

    fixture = TestBed.createComponent(DeviceStatusComponent)
    component = fixture.componentInstance
    component.subjectId = 'MRC03'
    component.source = ''
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
