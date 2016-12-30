import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartEmptyComponent } from './chart-empty.component';

describe('ChartEmptyComponent', () => {
  let component: ChartEmptyComponent;
  let fixture: ComponentFixture<ChartEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
