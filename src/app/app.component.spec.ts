/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { Routes, RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let el: DebugElement;

describe('App: RADAR', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        DashboardComponent,
        DashboardItemComponent
      ],
      imports: [
        MdCoreModule,
        MdButtonModule,
        MdIconModule,
        MdToolbarModule,
        routes
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
