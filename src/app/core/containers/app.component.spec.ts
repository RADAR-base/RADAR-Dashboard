import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { routes } from '../../app.routing'
import { AppComponent } from './app.component'
import { NotFoundPageComponent } from './not-found/not-found.component'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, NotFoundPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  })

  it('should create the app', async(() => {
    expect(component).toBeTruthy()
  }))
})
