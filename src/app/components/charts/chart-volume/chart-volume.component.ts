import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-volume',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-volume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartVolumeComponent extends ChartBaseComponent {
  dates: Date[]

  svg: any
  context: any
  chart: any
  width: number
  height: number
  xAxis: any
  xScale: any
  yScale: any
  xScaleBrush: any
  zoom: any
  brush: any
  area: any

  init() {
    this.context = this.svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', `translate(${this.margin.left}, 0)`)

    super.init()
  }

  draw() {
    this.yScale = d3
      .scaleLinear()
      .rangeRound([this.height - 25, 0])
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
        .call(d3.axisBottom(this.xScale))

    this.area = d3
      .area()
      .curve(d3.curveBasis)
      .x(d => this.xScale(d['date']))
      .y0(this.yScale(0))
      .y1(d => this.yScale(d['value']))

    this.context
      .append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', this.area)
  }
}
