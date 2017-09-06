import { Component } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-external-x-axis',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-external-x-axis.component.scss']
})
export class ChartExternalXAxisComponent extends ChartBaseComponent {
  data: any
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
    const data = this.data
    const newData = this.dates.map(function(d, i) {
      return { date: d, value: data[i] }
    })

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain(d3.extent(this.dates))

    this.xScaleBrush = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.dates))

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.dates))

    this.xAxis
      .attr('transform', 'translate(0, -10)')
      .call(d3.axisBottom(this.xScaleBrush))

    this.brush = d3
      .brushX()
      .extent([[0, 0], [this.width, this.height]])
      .on('brush end', () =>
        this.brushed(this.xScale, this.xScaleBrush, this.zoom)
      )

    this.zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [this.width, this.height]])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', d => this.zoomed(this.xScale, this.xScaleBrush, this.brush))

    this.context.selectAll('.brush').remove()
    this.context.selectAll('path').remove()
    this.context.selectAll('.axis--x-brush').remove()

    this.svg.selectAll('rect').remove()

    this.area = d3
      .area()
      .curve(d3.curveLinear)
      .x(d => this.xScaleBrush(d['date']))
      .y0(this.height)
      .y1(d => this.yScale(d['value']))

    this.context
      .append('path')
      .datum(newData)
      .attr('class', 'area')
      .attr('transform', 'translate(0, 30)')
      .attr('d', this.area)

    this.context
      .append('g')
      .attr('class', 'brush')
      .attr('transform', 'translate(0, 30)')
      .call(this.brush)
      .call(this.brush.move, this.xScaleBrush.range())

    this.context
      .append('g')
      .attr('class', 'axis axis--x-brush')
      .attr('transform', 'translate(0, 130)')
      .call(d3.axisBottom(this.xScaleBrush))

    this.context.call(this.zoom).call(this.zoom.transform, d3.zoomIdentity)
  }

  brushed(xScale, xScaleBrush, zoom) {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return
    const s = d3.event.selection || xScale.range()
    const svg = d3.selectAll('svg')

    xScale.domain(s.map(xScaleBrush.invert, xScaleBrush))
    svg.selectAll('.main').attr('transform', d3.event.transform)
    svg.select('.axis--x').call(d3.axisBottom(xScale))

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

    this.context.call(
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
    xaxis.call(d3.axisBottom(xScale))
  }
}
