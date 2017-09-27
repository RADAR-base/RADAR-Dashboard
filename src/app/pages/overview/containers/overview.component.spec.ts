import { HttpClientModule } from '@angular/common/http'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../../shared/testing/router-stubs'
import { OverviewPageComponent } from '../containers/overview.component'
import { OverviewPageModule } from '../overview.module'
import { StudyService } from '../services/study.service'
import { StudyEffects } from '../store/study/study.effects'
import { reducers } from '../store'

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent
  let fixture: ComponentFixture<OverviewPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        OverviewPageModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([StudyEffects])
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        StudyService
      ]
    })

    fixture = TestBed.createComponent(OverviewPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
