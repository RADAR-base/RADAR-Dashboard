import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../core/store'
import { ActivatedRoute, ActivatedRouteStub } from '../../shared/testing/router-stubs'
import { PatientPageComponent } from './patient.component'
import { PatientModule } from './patient.module'

describe('PatientPageComponent', () => {
  let component: PatientPageComponent
  let fixture: ComponentFixture<PatientPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      imports: [
        PatientModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })

    fixture = TestBed.createComponent(PatientPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
