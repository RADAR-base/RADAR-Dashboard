import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SourceGraphsComponent } from './source-graphs.component'
import { SourceGraphsModule } from './source-graphs.module'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGraphsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
