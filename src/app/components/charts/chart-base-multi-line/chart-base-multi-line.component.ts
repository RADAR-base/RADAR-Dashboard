import { Component, Input } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

import { AppConfig } from '../../../shared/utils/config'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-line.component.scss']
})
export class ChartBaseMultiLineComponent extends ChartBaseComponent {
  @Input() lineColors = AppConfig.charts.CATEGORICAL_COLORS

  dates: Date[]
  data: any[]
  keys: any[]
  svg: any
  chart: any
  width: number
  height: number
  xScale: any
  yScale: any
  colorScale: any
  xAxis: any
  yAxis: any
  lineChunkedFunctions: { [key: string]: Function } = {}
  lines: any
  line: any
  lineGroup: any

  init() {
    this.lineGroup = this.chart.append('g')

    // TODO: Add this as an option for x and y (hasXAxis)
    this.xAxis.remove()

    this.colorScale = d3
      .scaleOrdinal()
      .domain(this.keys.map(k => k.key))
      .range(this.lineColors)

    this.keys.map(k => {
      this.lineChunkedFunctions[k.key] = lineChunked()
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.value[k.key]))
        .curve(d3.curveBasis)
        .defined(d => d.value)
        .lineStyles({ stroke: this.colorScale(k.key) })
        .pointStyles({ fill: this.colorScale(k.key) })
    })

    super.init()
  }

  draw() {
    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.dates))

    const minValue = d3.min(
      this.keys.map(k => d3.min(this.data, d => d.value && d.value[k.key]))
    )

    const maxValue = d3.max(
      this.keys.map(k => d3.max(this.data, d => d.value && d.value[k.key]))
    )

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([minValue, maxValue])

    this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.lineGroup.selectAll('.line').remove()

    this.keys.map(k => {
      this.lineGroup
        .append('g')
        .attr('class', `line ${k.key}`)
        .datum(this.data)
        .call(this.lineChunkedFunctions[k.key])
    })
  }
}
