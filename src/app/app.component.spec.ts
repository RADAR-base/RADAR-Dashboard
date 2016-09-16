/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let el: DebugElement;

describe('App: RADAR', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have a toolbar`, async(() => {
    expect(el.query(By.css('app-toolbar'))).toBeTruthy();
  }));
});
