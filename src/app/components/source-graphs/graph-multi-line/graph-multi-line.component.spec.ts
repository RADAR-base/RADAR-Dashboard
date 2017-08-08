import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { ChartsModule } from '../../charts/charts.module'
import { SourceGraphsService } from '../source-graphs.service'
import { GraphMultiLineComponent } from './graph-multi-line.component'

describe('GraphMultiLineComponent', () => {
  let component: GraphMultiLineComponent
  let fixture: ComponentFixture<GraphMultiLineComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule, ChartsModule],
        providers: [SourceGraphsService],
        declarations: [GraphMultiLineComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMultiLineComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
