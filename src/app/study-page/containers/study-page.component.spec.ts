import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, combineReducers } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import * as fromStudyPage from '../store/index'
import { StudyPageModule } from '../study-page.module'
import { StudyPageComponent } from './study-page.component'

describe('StudyPageComponent', () => {
  let component: StudyPageComponent
  let fixture: ComponentFixture<StudyPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(async(() => {
    const activatedRoute = new ActivatedRouteStub()
    activatedRoute.testParams = { studyName: '0' }

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          studyPage: combineReducers(fromStudyPage.reducers)
        }),
        EffectsModule.forRoot([]),
        StudyPageModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(StudyPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  }))

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
