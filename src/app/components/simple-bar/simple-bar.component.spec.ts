import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SimpleBarComponent } from './simple-bar.component'

describe('SimpleBarComponent', () => {
  let component: SimpleBarComponent
  let fixture: ComponentFixture<SimpleBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBarComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBarComponent)
    component = fixture.componentInstance
    component.data = []
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
