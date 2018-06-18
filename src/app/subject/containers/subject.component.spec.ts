import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import { reducers } from '../store'
import { SubjectModule } from '../subject.module'
import { SubjectComponent } from './subject.component'

describe('SubjectPageComponent', () => {
  let component: SubjectComponent
  let fixture: ComponentFixture<SubjectComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()
    activatedRoute.testParams = { studyName: '0', patientId: 'MRC02' }

    TestBed.configureTestingModule({
      imports: [
        SubjectModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(SubjectComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
