import { DebugElement } from '@angular/core'
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'

import { reducer } from '../../shared/store'
import * as gridAction from '../../shared/store/grid/grid.actions'
import { MockGrid } from '../../shared/testing/mocks/mock-grid'
import { DashboardGridComponent } from './dashboard-grid.component'
import { DashboardGridModule } from './dashboard-grid.module'

describe('DashboardGridComponent', () => {
  let component: DashboardGridComponent
  let fixture: ComponentFixture<DashboardGridComponent>
  let element: HTMLElement
  let de: DebugElement
  let store

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardGridModule,
        StoreModule.provideStore(reducer)
      ]
    })

    fixture = TestBed.createComponent(DashboardGridComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  beforeEach(inject([Store], state => {
    store = state
  }))

  it('creates the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('shows isLoading', async(() => {
    expect(element.querySelector('app-progress-animation')).toBeTruthy()
    expect(element.querySelector('md-grid-list')).toBeFalsy()
  }))

  it('shows the grid', async(() => {
    store.dispatch(new gridAction.LoadSuccess(MockGrid))

    component.tiles$.subscribe(() => {
      fixture.detectChanges()
      expect(element.querySelector('app-progress-animation')).toBeFalsy()
      expect(element.querySelector('md-grid-list')).toBeTruthy()
    })
  }))

})
