import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../overview-page/store'
import {
  ActivatedRouteStub,
  RouterStub
} from '../../../shared/testing/router-stubs'
import { StudyPageModule } from '../study.module'
import { StudyPageComponent } from './study.component'

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
        imports: [StoreModule.forRoot(reducers), StudyPageModule],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ]
      })

      fixture = TestBed.createComponent(StudyPageComponent)
      component = fixture.componentInstance
      element = fixture.nativeElement
      de = fixture.debugElement
    })
  )

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
