import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { AppModule } from './app.module'
import { routes } from './app.routing'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, RouterTestingModule.withRoutes(routes)]
      }).compileComponents()
    })
  )

  it(
    'should create the app',
    async(() => {
      fixture = TestBed.createComponent(AppComponent)
      component = fixture.componentInstance
      expect(component).toBeTruthy()
    })
  )
})
