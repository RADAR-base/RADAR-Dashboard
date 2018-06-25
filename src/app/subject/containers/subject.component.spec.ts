import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, combineReducers } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import * as fromRoot from '../../store'
import * as fromFeature from '../store/index'
import { SubjectComponent } from './subject.component'

describe('SubjectPageComponent', () => {
  let component: SubjectComponent
  let fixture: ComponentFixture<SubjectComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(async () => {
    const activatedRoute = new ActivatedRouteStub()
    activatedRoute.testParams = { studyName: 'abc', patientId: '123' }

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        }),
        EffectsModule.forRoot([])
      ],
      declarations: [SubjectComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

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
