import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBaseLineComponent } from './chart-base-line.component';
import { DebugElement } from '@angular/core';
import { ChartModule } from '../chart.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store';

describe('ChartBaseLineComponent', () => {
  let component: ChartBaseLineComponent;
  let fixture: ComponentFixture<ChartBaseLineComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartModule,
        StoreModule.provideStore(reducer)
      ]
    });

    fixture = TestBed.createComponent(ChartBaseLineComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
