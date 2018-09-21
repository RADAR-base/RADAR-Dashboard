import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TileComponent } from './tile.component'

describe('TileComponent', () => {
  let component: TileComponent
  let fixture: ComponentFixture<TileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TileComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TileComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
