import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, combineReducers } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import * as fromRoot from '../../store'
import * as fromFeature from '../store'
import { SubjectPageComponent } from './subject-page.component'

describe('SubjectPageComponent', () => {
  let component: SubjectPageComponent
  let fixture: ComponentFixture<SubjectPageComponent>

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
      declarations: [SubjectPageComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SubjectPageComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
