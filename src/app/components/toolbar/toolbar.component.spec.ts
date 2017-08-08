import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ToolbarComponent } from './toolbar.component'
import { ToolbarModule } from './toolbar.module'

describe('ToolbarComponent', () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ToolbarModule]
      })

      fixture = TestBed.createComponent(ToolbarComponent)
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
