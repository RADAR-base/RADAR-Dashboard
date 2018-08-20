import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'

import {
  ActivatedRouteStub,
  RouterStub
} from '../../../shared/testing/router-stubs'
import { NotFoundPageComponent } from './not-found-page.component'

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent
  let fixture: ComponentFixture<NotFoundPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    const activatedRoute = ActivatedRouteStub

    TestBed.configureTestingModule({
      declarations: [NotFoundPageComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })

    fixture = TestBed.createComponent(NotFoundPageComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
