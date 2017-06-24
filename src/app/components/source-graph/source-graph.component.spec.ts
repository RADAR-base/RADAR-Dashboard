import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SourceGraphComponent } from './source-graph.component'

describe('SourceGraphComponent', () => {
  let component: SourceGraphComponent
  let fixture: ComponentFixture<SourceGraphComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceGraphComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGraphComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
