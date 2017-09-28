import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../store'
import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import { SubjectPageModule } from '../subject.module'
import { SubjectPageComponent } from './subject.component'

describe('SubjectPageComponent', () => {
  let component: SubjectPageComponent
  let fixture: ComponentFixture<SubjectPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()
    activatedRoute.testParams = { studyId: '0', patientId: 'MRC02' }

    TestBed.configureTestingModule({
      imports: [
        SubjectPageModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })

    fixture = TestBed.createComponent(SubjectPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
