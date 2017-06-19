import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component'
import { AppModule } from './app.module'
import { routes } from './app.routing'
import { reducer } from './shared/store'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes),
        StoreModule.provideStore(reducer)
      ]
    })

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  }))

  it('should create the app', async(() => {
    expect(component).toBeTruthy()
  }))

  it(`should have a toolbar`, async(() => {
    expect(element.querySelector('app-toolbar')).toBeTruthy()
  }))

})
