import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import { OverviewPageModule } from '../overview-page.module'
import { StudiesService } from '../services/studies.service'
import { reducers } from '../store'
import { StudiesEffects } from '../store/studies/studies.effects'
import { OverviewPageComponent } from './overview-page'

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent
  let fixture: ComponentFixture<OverviewPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      imports: [
        OverviewPageModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([StudiesEffects])
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        StudiesService
      ]
    })

    fixture = TestBed.createComponent(OverviewPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
