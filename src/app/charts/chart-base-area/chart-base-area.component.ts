import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-area',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseAreaComponent extends ChartBaseComponent {
  data: ChartData[]
  area: any

  init() {
    this.area = d3
      .area<any>()
      // .defined(d => d.value)
      .curve(d3.curveBasis)

    super.init()
  }

  draw() {
    this.yScale = d3
      .scaleLinear()
      .rangeRound([this.height, 0])
      .domain(d3.extent(this.data, d => d.value as number))

    this.xScale = d3
      .scaleTime()
      .rangeRound([0, this.width])
      .domain(d3.extent(this.data, d => d.date))
      .nice()

    this.hasYAxis &&
      this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.hasXAxis &&
      this.xAxis
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.xScale).tickSize(-this.height))

    this.chart.selectAll('.area').remove()

    this.area
      .x(d => this.xScale(d.date))
      .y0(this.yScale(0))
      .y1(d => this.yScale(d.value))

    this.chart
      .append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', this.area)
  }
}
