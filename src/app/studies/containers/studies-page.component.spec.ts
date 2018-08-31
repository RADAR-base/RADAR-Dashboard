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
import * as fromFeature from '../store/studies.reducer'
import { StudiesPageComponent } from './studies-page.component'

describe('StudiesPageComponent', () => {
  let component: StudiesPageComponent
  let fixture: ComponentFixture<StudiesPageComponent>

  beforeEach(async () => {
    const activatedRoute = new ActivatedRouteStub()

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          studies: combineReducers(fromFeature.reducer)
        }),
        EffectsModule.forRoot([])
      ],
      declarations: [StudiesPageComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(StudiesPageComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
