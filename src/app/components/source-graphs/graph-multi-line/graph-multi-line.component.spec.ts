import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ChartsModule } from '../../charts/charts.module'
import { GraphMultiLineComponent } from './graph-multi-line.component'

describe('GraphMultiLineComponent', () => {
  let component: GraphMultiLineComponent
  let fixture: ComponentFixture<GraphMultiLineComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ChartsModule],
        declarations: [GraphMultiLineComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMultiLineComponent)
    component = fixture.componentInstance
    component.isLoaded = false
    component.label = ''
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
