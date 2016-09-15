/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: RADAR', () => {
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

  it(`should have a toolbar`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let el = fixture.debugElement.nativeElement;
    expect(el.querySelector('app-toolbar')).toBeTruthy();
  }));
});
