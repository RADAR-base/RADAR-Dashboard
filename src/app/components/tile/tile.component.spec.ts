/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TileComponent } from './tile.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TileModule } from './tile.module';

describe('Component: Tile', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          TileModule
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

    // Tile Stub
    component.tile = {
      id: 1,
      rows: 2,
      cols: 3,
      title: 'Heart Rate Monitoring',
      type: 'heart-rate'
    };

    fixture.detectChanges();
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

});

