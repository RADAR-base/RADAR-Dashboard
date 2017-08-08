import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { ChartsModule } from '../../charts/charts.module'
import { SourceGraphsService } from '../source-graphs.service'
import { GraphSingleLineComponent } from './graph-single-line.component'

describe('GraphSingleLineComponent', () => {
  let component: GraphSingleLineComponent
  let fixture: ComponentFixture<GraphSingleLineComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule, ChartsModule],
        providers: [SourceGraphsService],
        declarations: [GraphSingleLineComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSingleLineComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
