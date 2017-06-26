import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { MultiTimeSeries } from '../../../shared/models/multi-time-series.model'
import { AppConfig } from '../../../shared/utils/config'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-line.component.scss']
})
export class ChartBaseMultiLineComponent extends ChartBaseComponent {
  data: MultiTimeSeries

  @Input() lineColors = AppConfig.charts.CATEGORICAL_COLORS

  svg: any
  chart: any
  width: number
  height: number
  xScale: any
  yScale: any
  zScale: any
  xAxis: any
  yAxis: any
  lines: any
  line: any
  firstDraw = true

  init () {
    this.line = d3.line()
      .curve(d3.curveBasis)
      .defined((d: any) => d)

    super.init()
  }

  draw () {
    const minDate = d3.min(this.data.dates)
    const maxDate = d3.max(this.data.dates)

    this.xScale = d3.scaleTime()
      .range([0, this.width])
      .domain([minDate, maxDate])

    const minValue = d3.min(this.data.keys.map(k => d3.min(this.data.values[k.key])))
    const maxValue = d3.max(this.data.keys.map(k => d3.max(this.data.values[k.key])))

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([minValue, maxValue])

    this.zScale = d3.scaleOrdinal()
      .domain(this.data.keys.map(k => k.key))
      .range(this.lineColors)

    this.xAxis
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xScale))

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    )

    this.line
      .x((d, i) => this.xScale(this.data.dates[i]))
      .y(d => this.yScale(d))

    this.lines = this.chart.selectAll('.line')
      .data(this.data.keys, k => k.key)

    this.lines.enter().append('path')
      .attr('class', 'line')
      .merge(this.lines)
      .transition()
      .attr('d', k => this.line(this.data.values[k.key]))
      .style('stroke', k => this.zScale(k.key))

    this.lines.exit().remove()
  }
}
