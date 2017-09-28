import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { reducers } from '../../store'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceGraphsModule } from './source-graphs.module'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>

  class MockStore {
    public dispatch(obj) {}

    public select(obj) {
      return Observable.of([{ id: 0, value: 0 }])
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SourceGraphsModule, StoreModule.forRoot(reducers)],
        providers: [{ provide: Store, useClass: MockStore }]
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
