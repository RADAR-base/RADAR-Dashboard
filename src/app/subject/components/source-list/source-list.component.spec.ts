import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import * as fromRoot from '../../../store'
import * as fromFeature from '../../store'
import { SourceListComponent } from './source-list.component'

describe('SourceListComponent', () => {
  let component: SourceListComponent
  let fixture: ComponentFixture<SourceListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [SourceListComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceListComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
