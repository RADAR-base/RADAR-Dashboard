import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-source-charts',
  template: `
    <p>
      SOURCE CHARTS
    </p>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnInit {

  constructor () { }

  ngOnInit () { }

}
