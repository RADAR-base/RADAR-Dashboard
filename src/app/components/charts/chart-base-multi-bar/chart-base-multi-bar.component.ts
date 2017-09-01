import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-bar.component.scss']
})
export class ChartBaseMultiBarComponent extends ChartBaseComponent {
  @Input() categorical = false

  data: any
  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  yAxis: any
  bar: any
  xScaleOuter: any
  xScaleInner: any
  yScale: any
  legend: any
  dates: any
  keys: any
  rects: any

  tickValues = [0, 0.25, 0.5, 0.75, 1]

  init() {
    super.init()
  }

  draw() {
    // Axis

    this.xScaleInner = d3.scaleBand().paddingInner(0.3)

    this.xScaleOuter = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.4)

    this.yScale = d3.scaleLinear().rangeRound([this.height, 0])

    this.dates = this.data.dates
    this.keys = this.data.keys.map(k => k.key)

    this.xScaleOuter.domain(this.dates)
    this.xScaleInner
      .domain(this.keys)
      .rangeRound([0, this.xScaleOuter.bandwidth()])
    this.yScale.domain([0, 1])

    this.xAxis.attr('transform', `translate(0, ${this.height})`).call(
      d3
        .axisBottom(this.xScaleOuter)
        .tickValues(
          this.xScaleOuter.domain().filter(function(d, i) {
            return !(i % 3)
          })
        )
        .tickFormat(d3.timeFormat('%d %b'))
    )

    this.yAxis.call(
      d3
        .axisLeft(this.yScale)
        .tickSize(-this.width)
        .ticks(4, '%')
        .tickValues(this.tickValues)
    )

    // Bars

    let j = 0
    const xScaleOuter = this.xScaleOuter
    const xScaleInner = this.xScaleInner
    const yScale = this.yScale
    const values = this.data.values
    const height = this.height
    const width = this.width

    this.chart.selectAll('rect').remove()
    this.chart.selectAll('.nullSymbol').remove()

    this.bar = this.chart
      .selectAll('bar')
      .data(this.data.dates)
      .enter()
      .append('g')
      .attr('class', 'g')
      .attr('id', d => j++)
      .attr('transform', d => `translate(${xScaleOuter(d)}, 0)`)

    this.rects = this.bar
      .selectAll('g')
      .data(this.data.keys, k => k.key)
      .enter()
      .append('rect')
      .attr('width', xScaleInner.bandwidth())
      .attr('class', d => d.key)
      .attr('id', function(d) {
        return values[d.key][this.parentNode.id] === null ? 'null' : 'notnull'
      })
      .attr('x', d => xScaleInner(d.key))
      .attr('y', function(d) {
        return yScale(values[d.key][this.parentNode.id])
      })
      .attr('height', function(d) {
        return height - yScale(values[d.key][this.parentNode.id])
      })

    this.rects
      .nodes()
      .filter(d => d.id === 'null')
      .forEach(function(d) {
        d3
          .select(d.parentNode)
          .append('text')
          .attr('class', 'nullSymbol')
          .attr('fill', '#fff')
          .attr('x', xScaleInner(d.className.baseVal))
          .attr('y', height - height / 40)
          .style('font-size', width / 70)
          .text('x')
      })

    this.bar
      .selectAll('rects')
      .data(this.data.keys, k => k.key)
      .enter()
      .append('rect')
      .attr('width', xScaleInner.bandwidth())
      .attr('class', 'backbar')
      .attr('x', d => xScaleInner(d.key))
      .attr('y', yScale(1))
      .attr('height', function(d) {
        return yScale(values[d.key][this.parentNode.id])
      })

    this.bar.exit().remove()
  }
}
