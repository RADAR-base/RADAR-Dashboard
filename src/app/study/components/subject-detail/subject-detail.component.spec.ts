import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { SubjectDetailComponent } from './subject-detail.component'

describe('SubjectDetailComponent', () => {
  let component: SubjectDetailComponent
  let fixture: ComponentFixture<SubjectDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SubjectDetailComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailComponent)
    component = fixture.componentInstance

    component.subject = null

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
