import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../shared/store'
import { ActivatedRouteStub, RouterStub } from '../../shared/testing/router-stubs'
import { OverviewPageComponent } from './overview.component'
import { OverviewPageModule } from './overview.module'

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent
  let fixture: ComponentFixture<OverviewPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = new ActivatedRouteStub()

    TestBed.configureTestingModule({
      imports: [
        OverviewPageModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })

    fixture = TestBed.createComponent(OverviewPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
