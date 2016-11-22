/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TileComponent } from '../tile/tile.component';
import { GridService } from '../../services/grid.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TileType } from '../tile/tile.type';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers/index';

describe('Component: Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.provideStore(reducer)
        ],
        declarations: [
          DashboardComponent,
          TileComponent
        ],
        providers: [
          TileType
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

});
