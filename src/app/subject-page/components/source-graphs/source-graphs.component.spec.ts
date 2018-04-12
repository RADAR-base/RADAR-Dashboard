import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromSubjectPage from '../../store'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceGraphsModule } from './source-graphs.module'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SourceGraphsModule,
        StoreModule.forRoot({
          subjectPage: combineReducers(fromSubjectPage.reducers)
        }),
        EffectsModule.forRoot([])
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGraphsComponent)
    component = fixture.componentInstance

    component.sensorsData = []
    component.dates = []
    component.sources = []
  })

  it('should be created', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
