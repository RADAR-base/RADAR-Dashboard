import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component'
import { routes } from './app.routing'
import { DashboardGridComponent } from './components/dashboard-grid/dashboard-grid.component'
import { reducer } from './core/store'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.provideStore(reducer)
      ],
      declarations: [
        AppComponent,
        DashboardGridComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create the app', async(() => {
    expect(component).toBeTruthy()
  }))

  it(`should have a toolbar`, async(() => {
    expect(element.querySelector('app-toolbar')).toBeTruthy()
  }))

})
