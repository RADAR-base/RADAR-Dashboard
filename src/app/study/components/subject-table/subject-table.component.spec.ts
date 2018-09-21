import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'

import { RouterStub } from '../../../../assets/testing/router-stubs'
import { SubjectTableComponent } from './subject-table.component'
import { SubjectTableModule } from './subject-table.module'

describe('SubjectTableComponent', () => {
  let component: SubjectTableComponent
  let fixture: ComponentFixture<SubjectTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SubjectTableModule, BrowserAnimationsModule],
      providers: [{ provide: Router, useClass: RouterStub }]
    })

    fixture = TestBed.createComponent(SubjectTableComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
