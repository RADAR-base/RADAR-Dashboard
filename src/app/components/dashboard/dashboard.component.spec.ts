/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('Component: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(DashboardComponent);
    let el = fixture.debugElement.componentInstance;
    expect(el).toBeTruthy();
  }));

  it(`should have a toolbar`, async(() => {
    let fixture = TestBed.createComponent(DashboardComponent);
    let el = fixture.debugElement.nativeElement;
    expect(el.querySelector('md-toolbar')).toBeTruthy();
  }));
});
