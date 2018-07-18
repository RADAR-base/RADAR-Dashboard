import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-date-axis',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-date-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDateAxisComponent extends ChartBaseComponent {
  @Input() data

  init() {
    super.init()
  }

  draw() {
    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain([new Date(this.data[0]), new Date(this.data[1])])
      .nice()

    this.xAxis.call(d3.axisBottom(this.xScale))
  }
}
