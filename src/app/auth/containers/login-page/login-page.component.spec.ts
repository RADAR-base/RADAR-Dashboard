import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'

import { LoginPageComponent } from './login-page.component'

describe('LoginPageComponent', () => {
  let component: LoginPageComponent
  let fixture: ComponentFixture<LoginPageComponent>
  let store: Store<any>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [LoginPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })

    await TestBed.compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent)
    component = fixture.componentInstance
    store = TestBed.get(Store)

    spyOn(store, 'dispatch').and.callThrough()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
