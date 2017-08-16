import { Component, Input } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { AppConfig } from '../../../shared/utils/config'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-line.component.scss']
})
export class ChartBaseLineComponent extends ChartBaseComponent {
  data: TimeSeries[]

  @Input() gradientEnabled = false
  @Input() gradientColors = AppConfig.charts.GRADIENT_COLORS
  @Input() gradientStops = AppConfig.charts.GRADIENT_STOPS

  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  yAxis: any
  xScale: any
  yScale: any
  line: any
  lineEl: any
  gradient: any
  lineChunked: any
  xAxisBrush: any
  context: any
  lineChunkedBrush: any
  heightBrush: any
  yScaleBrush: any
  zoom: any
  xAxisCall: any
  brush: any
  lineElBrush: any
  xScaleBrush: any
  yAxisBrush: any
  xAxisCallBrush: any

  init() {
    // Add HR Gradient
    if (this.gradientEnabled) {
      this.chart.classed('hr-gradient', true)

      this.gradient = this.svg.append('linearGradient')
      this.gradient
        .attr('id', 'hr-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('x2', 0)
        .selectAll('stop')
        .data(this.gradientColors)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)
    }

    this.lineEl = this.chart.append('g').attr('clip-path', 'url(#clip)')

    super.init()
  }

  draw() {
    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain(d3.extent(this.data, d => d.value))

    this.xScaleBrush = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))

    this.xAxis.remove()
    this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    // Add HR Gradient
    if (this.gradientEnabled) {
      this.gradient
        .attr('y1', this.yScale(this.gradientStops.y1))
        .attr('y2', this.yScale(this.gradientStops.y2))
    }

    this.lineChunked = lineChunked()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.value))
      .curve(d3.curveLinear)
      .defined((d: any) => d.value)

    this.lineEl.selectAll('.main').remove()

    this.lineEl
      .append('g')
      .datum(this.data)
      .call(this.lineChunked)
      .attr('class', 'main')

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', d => this.zoomed(this.xScale, this.xScaleBrush, this.brush))

    this.brush = d3.brushX().extent([[0, 0], [this.width, this.height]])

    this.svg.call(this.zoom).call(this.zoom.transform, d3.zoomIdentity)
  }

  zoomed(xScale, xScaleBrush, brush) {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return
    const svg = d3.selectAll('svg')
    const xaxis = svg.selectAll('.axis--x')
    const t = d3.event.transform
    const newBrushPosition = xScale.range().map(t.invertX, t)

    newBrushPosition[0] = Math.max(xScale.range()[0], newBrushPosition[0])
    newBrushPosition[1] = Math.min(xScale.range()[1], newBrushPosition[1])
    svg.select('.brush').call(brush.move, newBrushPosition)

    svg
      .selectAll('.main')
      .attr(
        'transform',
        'translate(' +
          d3.event.transform.x +
          ',0) scale(' +
          d3.event.transform.k +
          ',1)'
      )
    svg.selectAll('circle').attr('r', 3 / t.k)

    xScale.domain(t.rescaleX(xScaleBrush).domain())
    xaxis.call(d3.axisBottom(xScale))
  }
}
