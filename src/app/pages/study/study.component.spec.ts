import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../shared/store'
import {
  ActivatedRouteStub,
  RouterStub
} from '../../shared/testing/router-stubs'
import { StudyPageComponent } from './study.component'
import { StudyPageModule } from './study.module'

describe('StudyPageComponent', () => {
  let component: StudyPageComponent
  let fixture: ComponentFixture<StudyPageComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(
    async(() => {
      const activatedRoute = new ActivatedRouteStub()
      activatedRoute.testParams = { studyId: '0' }

      TestBed.configureTestingModule({
        imports: [StudyPageModule, StoreModule.forRoot(reducers)],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ]
      })

      fixture = TestBed.createComponent(StudyPageComponent)
      component = fixture.componentInstance
      element = fixture.nativeElement
      de = fixture.debugElement
      console.log(component)
      fixture.detectChanges()
    })
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
