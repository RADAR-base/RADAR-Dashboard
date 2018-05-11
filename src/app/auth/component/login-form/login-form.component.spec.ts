import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '../../../material'
import { LoginFormComponent } from './login-form.component'

describe('LoginFormComponent', () => {
  let component: LoginFormComponent
  let fixture: ComponentFixture<LoginFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule],
      declarations: [LoginFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
