import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AppModule } from '../app.module'
import { routes } from '../app.routing'
import { AppComponent } from './app.component'

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
