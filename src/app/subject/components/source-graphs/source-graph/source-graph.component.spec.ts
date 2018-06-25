import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { MockSourceData } from '../../../../shared/testing/mocks/mock-sources'
import { reducers } from '../../../store'
import { SourceGraphComponent } from './source-graph.component'

describe('SourceGraphComponent', () => {
  let component: SourceGraphComponent
  let fixture: ComponentFixture<SourceGraphComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [SourceGraphComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceGraphComponent)
    component = fixture.componentInstance

    component.sourceData = MockSourceData

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
