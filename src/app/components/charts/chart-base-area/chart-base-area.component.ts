import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../../shared/models/chart-data.model'
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
  radius = 8

  init() {
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

    this.area = d3
      .area<any>()
      .curve(d3.curveBasis)
      .x(d => this.xScale(d.date))
      .y0(this.yScale(0))
      .y1(d => this.yScale(d.value))

    this.chart.selectAll('.area') && this.chart.selectAll('.area').remove()
    this.chart.selectAll('rect').remove()

    this.chart
      .append('rect')
      .attr('height', this.height)
      .attr('width', this.width)
      .attr('rx', this.radius)
      .attr('ry', this.radius)
      .attr('class', 'background')

    this.chart
      .append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', this.area)
  }

  addGrid() {
    return d3.axisBottom(this.xScale).ticks(5)
  }
}
