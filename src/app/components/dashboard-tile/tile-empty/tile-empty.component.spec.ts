import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TileEmptyComponent } from './tile-empty.component'

describe('TileEmptyComponent', () => {
  let component: TileEmptyComponent
  let fixture: ComponentFixture<TileEmptyComponent>

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [TileEmptyComponent]
      })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEmptyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
