import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../store'
import { SourceGraphsModule } from '../source-graphs.module'
import { SourceGraphComponent } from './source-graph.component'

describe('SourceGraphComponent', () => {
  let component: SourceGraphComponent
  let fixture: ComponentFixture<SourceGraphComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule, StoreModule.forRoot(reducers)]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGraphComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
