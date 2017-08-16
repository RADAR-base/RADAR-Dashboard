import { Component } from '@angular/core'
import * as d3 from 'd3'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-external-x-axis',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-external-x-axis.component.scss']
})
export class ChartExternalXAxisComponent extends ChartBaseComponent {
  data: TimeSeries[]

  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  xScale: any
  xScaleBrush: any
  zoom: any
  brush: any

  init() {
    super.init()
  }

  draw() {
    this.xScaleBrush = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))

    this.xAxisBrush
      .attr('transform', 'translate(0, 0)')
      .call(d3.axisBottom(this.xScaleBrush))

    this.xAxis
      .attr('transform', 'translate(0, 20)')
      .call(d3.axisBottom(this.xScaleBrush))

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', d => this.zoomed(this.xScale, this.xScaleBrush, this.brush))

    this.brush = d3
      .brushX()
      .extent([[0, 0], [this.width, this.height]])
      .on('brush end', () =>
        this.brushed(this.xScale, this.xScaleBrush, this.zoom)
      )

    this.context.selectAll('.brush').remove()
    this.svg.selectAll('rect').remove()

    this.context
      .append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .call(this.brush.move, this.xScaleBrush.range())

    this.svg
      .append('rect')
      .attr('class', 'zoom')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      )
      .call(this.zoom)

    this.chart.call(this.zoom).call(this.zoom.transform, d3.zoomIdentity)
  }

  brushed(xScale, xScaleBrush, zoom) {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return
    const s = d3.event.selection || xScale.range()
    const svg = d3.selectAll('svg')

    xScale.domain(s.map(xScaleBrush.invert, xScaleBrush))
    svg.selectAll('.main').attr('transform', d3.event.transform)
    svg.select('.axis--x').call(d3.axisBottom(this.xScale))

    svg
      .selectAll('.main')
      .attr(
        'transform',
        'scale (' +
          this.width / (s[1] - s[0]) +
          ', 1) translate(-' +
          s[0] +
          ', 0)'
      )

    svg
      .select('.zoom')
      .call(
        zoom.transform,
        d3.zoomIdentity.scale(this.width / (s[1] - s[0])).translate(-s[0], 0)
      )
  }

  zoomed(xScale, xScaleBrush, brush) {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return
    const svg = d3.selectAll('svg')
    const t = d3.event.transform
    const xaxis = svg.selectAll('.axis--x')

    const newBrushPosition = xScale.range().map(t.invertX, t)
    newBrushPosition[0] = Math.max(xScale.range()[0], newBrushPosition[0])
    newBrushPosition[1] = Math.min(xScale.range()[1], newBrushPosition[1])

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
    svg.select('.brush').call(brush.move, newBrushPosition)
    xScale.domain(t.rescaleX(xScaleBrush).domain())
    xaxis.call(d3.axisBottom(this.xScale))
  }
}
