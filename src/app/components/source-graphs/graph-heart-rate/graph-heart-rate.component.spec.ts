import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { ChartsModule } from '../../charts/charts.module'
import { SourceGraphsService } from '../source-graphs.service'
import { GraphHeartRateComponent } from './graph-heart-rate.component'

describe('GraphHeartRateComponent', () => {
  let component: GraphHeartRateComponent
  let fixture: ComponentFixture<GraphHeartRateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ChartsModule
      ],
      providers: [SourceGraphsService],
      declarations: [
        GraphHeartRateComponent
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphHeartRateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
