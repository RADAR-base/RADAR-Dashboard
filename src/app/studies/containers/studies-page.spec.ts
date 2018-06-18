import { HttpClientModule } from '@angular/common/http'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import { StudiesService } from '../services/studies.service'
import { StudiesEffects } from '../store/studies.effects'
import { reducer } from '../store/studies.reducer'
import { StudiesModule } from '../studies.module'
import { StudiesPageComponent } from './studies-page'

describe('OverviewPageComponent', () => {
  let component: StudiesPageComponent
  let fixture: ComponentFixture<StudiesPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      imports: [
        StudiesModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([StudiesEffects]),
        HttpClientModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        StudiesService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(StudiesPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
