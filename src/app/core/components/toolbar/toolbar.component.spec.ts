import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { ToolbarComponent } from './toolbar.component'
import { ToolbarModule } from './toolbar.module'

describe('ToolbarComponent', () => {
  let component: ToolbarComponent
  let fixture: ComponentFixture<ToolbarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToolbarModule, StoreModule.forRoot({})]
    })

    fixture = TestBed.createComponent(ToolbarComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
