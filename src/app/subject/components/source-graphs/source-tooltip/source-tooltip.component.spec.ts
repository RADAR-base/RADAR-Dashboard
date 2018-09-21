import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ShortenLabelPipe } from '../../../../shared/pipes/pipes'
import { SourceTooltipComponent } from './source-tooltip.component'

describe('SourceTooltipComponent', () => {
  let component: SourceTooltipComponent
  let fixture: ComponentFixture<SourceTooltipComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceTooltipComponent, ShortenLabelPipe]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTooltipComponent)
    component = fixture.componentInstance
    component.data = []
    component.position = { x: 0, y: 0 }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
