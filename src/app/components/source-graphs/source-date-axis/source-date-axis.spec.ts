import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SourceGraphsModule } from '../source-graphs.module'
import { SourceDateAxisComponent } from './source-date-axis'

describe('SourceDateAxisComponent', () => {
  let component: SourceDateAxisComponent
  let fixture: ComponentFixture<SourceDateAxisComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceDateAxisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
