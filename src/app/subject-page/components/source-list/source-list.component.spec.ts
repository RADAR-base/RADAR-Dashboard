import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../store'
import { SourceListComponent } from './source-list.component'

describe('SourceListComponent', () => {
  let component: SourceListComponent
  let fixture: ComponentFixture<SourceListComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot(reducers)],
        declarations: [SourceListComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
