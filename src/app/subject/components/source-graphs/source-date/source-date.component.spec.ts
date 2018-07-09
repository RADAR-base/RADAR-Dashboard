import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { SourceGraphsModule } from '../source-graphs.module'
import { SourceDateComponent } from './source-date.component'

describe('SourceDateComponent', () => {
  let component: SourceDateComponent
  let fixture: ComponentFixture<SourceDateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SourceGraphsModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceDateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
