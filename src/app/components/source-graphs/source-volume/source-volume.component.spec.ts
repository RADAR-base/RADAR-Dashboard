import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { SourceGraphsModule } from '../source-graphs.module'
import { SourceVolumeComponent } from './source-volume.component'

describe('SourceVolumeComponent', () => {
  let component: SourceVolumeComponent
  let fixture: ComponentFixture<SourceVolumeComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVolumeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
