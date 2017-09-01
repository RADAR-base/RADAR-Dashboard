import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { GraphBaseComponent } from './graph-base.component'

describe('GraphBaseComponent', () => {
  let component: GraphBaseComponent
  let fixture: ComponentFixture<GraphBaseComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [GraphBaseComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBaseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
