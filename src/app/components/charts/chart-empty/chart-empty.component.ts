import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-chart-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
    </div>
    <div class="container">
    </div>
  `,
  styleUrls: ['chart-empty.component.scss']
})
export class ChartEmptyComponent implements OnInit {

  @Input() title: string;

  constructor() {}

  ngOnInit() {}

}
