import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chart-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div></div>
  `,
  styleUrls: ['chart-empty.component.scss']
})
export class ChartEmptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
