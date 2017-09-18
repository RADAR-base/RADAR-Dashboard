import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'

import { RouterStub } from '../../../shared/testing/router-stubs'
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
        imports: [SubjectTableModule, BrowserAnimationsModule],
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
