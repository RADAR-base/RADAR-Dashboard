import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../shared/store'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceGraphsModule } from './source-graphs.module'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule, StoreModule.forRoot(reducers)]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGraphsComponent)
    component = fixture.componentInstance

    component.sensorsData = []
    component.dates = []
    component.sources = []
  })

  it('should be created', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
