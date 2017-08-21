import { Component, Input } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

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
  lineChunked: any
  lines: any
  line: any
  newData: any
  lineEl: any

  init() {
    this.lineEl = this.chart.append('g').attr('clip-path', 'url(#clip)')

    super.init()
  }

  draw() {
    const minDate = d3.min(this.data.dates)
    const maxDate = d3.max(this.data.dates)
    const dates = this.data.dates
    const keys = this.data.keys.map(k => k.key)

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain([minDate, maxDate])

    const minValue = d3.min(
      this.data.keys.map(k => d3.min(this.data.values[k.key]))
    )
    const maxValue = d3.max(
      this.data.keys.map(k => d3.max(this.data.values[k.key]))
    )

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([minValue, maxValue])

    this.zScale = d3.scaleOrdinal().domain(keys).range(this.lineColors)

    this.xAxis.remove()

    this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.chart.selectAll('.line').remove()

    const colorsFunction = (d, i) => this.zScale(keys[i])

    this.lineChunked = lineChunked()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y))
      .curve(d3.curveLinear)
      .defined(function(d) {
        return d.y != null
      })
      .lineStyles({ stroke: colorsFunction })
      .pointStyles({ fill: colorsFunction })

    this.newData = this.data.keys
      .map(k => k.key)
      .map(d => this.data.values[d])
      .map(d =>
        d.map(function(e, i) {
          return { x: dates[i], y: e }
        })
      )

    this.lineEl.selectAll('.main').remove()

    this.lineEl.append('g').attr('class', 'main')

    this.lines = this.lineEl
      .select('.main')
      .selectAll('.line')
      .data(this.newData)

    this.line = this.lines.enter().append('g')

    this.lines.merge(this.line).attr('class', 'line').call(this.lineChunked)

    this.lines.exit().remove()
  }
}
