import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StudyPageComponent } from './study.component'

describe('StudyPageComponent', () => {
  let component: StudyPageComponent
  let fixture: ComponentFixture<StudyPageComponent>

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [StudyPageComponent]
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
