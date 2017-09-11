import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../shared/store'
import {
  ActivatedRouteStub,
  RouterStub
} from '../../../shared/testing/router-stubs'
import { SubjectTableComponent } from './subject-table.component'
import { SubjectTableModule } from './subject-table.module'

describe('SubjectTableComponent', () => {
  let component: SubjectTableComponent
  let fixture: ComponentFixture<SubjectTableComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SubjectTableModule],
        providers: [{ provide: Router, useClass: RouterStub }]
      })

      fixture = TestBed.createComponent(SubjectTableComponent)
      component = fixture.componentInstance
      element = fixture.nativeElement
      de = fixture.debugElement

      fixture.detectChanges()
    })
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
