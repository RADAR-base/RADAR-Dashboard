import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-source-graph',
  template: `
    <p>{{ sources | json }}</p>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnInit {

  @Input() sources

  language = AppConfig.language

  constructor () { }

  ngOnInit () { }

}
