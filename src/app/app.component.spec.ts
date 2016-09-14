/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: RADAR-Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let el = fixture.debugElement.componentInstance;
    expect(el).toBeTruthy();
  }));

  it(`should have the DashboardComponent`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let el = fixture.debugElement.nativeElement;
    expect(el.querySelector('app-dashboard')).toBeTruthy();
  }));
});
