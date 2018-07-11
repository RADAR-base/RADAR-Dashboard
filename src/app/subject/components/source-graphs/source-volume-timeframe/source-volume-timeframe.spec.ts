import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { SourceGraphsModule } from '../source-graphs.module'
import { SourceVolumeTimeFrameComponent } from './source-volume-timeframe'

describe('SourceVolumeTimeFrameComponent', () => {
  let component: SourceVolumeTimeFrameComponent
  let fixture: ComponentFixture<SourceVolumeTimeFrameComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SourceGraphsModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVolumeTimeFrameComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
