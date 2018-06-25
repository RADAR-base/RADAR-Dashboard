import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SimpleBarComponent } from './simple-bar.component'

describe('SimpleBarComponent', () => {
  let component: SimpleBarComponent
  let fixture: ComponentFixture<SimpleBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleBarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SimpleBarComponent)
    component = fixture.componentInstance

    component.data = []

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
