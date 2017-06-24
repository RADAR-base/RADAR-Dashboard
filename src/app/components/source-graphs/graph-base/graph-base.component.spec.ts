import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GraphBaseComponent } from './graph-base.component'
import { SourceGraphsService } from '../source-graphs.service'
import { HttpModule } from '@angular/http'

describe('GraphBaseComponent', () => {
  let component: GraphBaseComponent
  let fixture: ComponentFixture<GraphBaseComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SourceGraphsService],
      declarations: [GraphBaseComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBaseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
