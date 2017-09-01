import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ChartsModule } from '../../charts/charts.module'
import { GraphSingleLineComponent } from './graph-single-line.component'

describe('GraphSingleLineComponent', () => {
  let component: GraphSingleLineComponent
  let fixture: ComponentFixture<GraphSingleLineComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ChartsModule],
        declarations: [GraphSingleLineComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSingleLineComponent)
    component = fixture.componentInstance
    component.isLoaded = false
    component.label = ''
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
