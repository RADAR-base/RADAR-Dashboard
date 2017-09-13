import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-bar.component.scss']
})
export class ChartBaseMultiBarComponent extends ChartBaseComponent {
  @Input() categorical = false
  @Input() yTicks

  data: ChartData[]
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
  keys: any[]
  rects: any

  init() {
    super.init()
  }

  draw() {
    this.xScaleInner = d3.scaleBand().paddingInner(0.3)

    this.xScaleOuter = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.4)

    this.yScale = d3.scaleLinear().rangeRound([this.height, 0])

    this.xScaleOuter.domain(this.data.map(d => d.date))

    this.xScaleInner
      .domain(this.keys.map(d => d.key))
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
        .tickValues(this.yTicks)
    )

    // Bars
    let j = 0
    const yScale = this.yScale
    const height = this.height
    const data = this.data

    this.chart.selectAll('rect').remove()
    this.chart.selectAll('.null-symbol').remove()

    this.bar = this.chart
      .selectAll('bar')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'g')
      .attr('id', d => j++)
      .attr('transform', d => `translate(${this.xScaleOuter(d.date)}, 0)`)

    this.rects = this.bar
      .selectAll('g')
      .data(this.keys)
      .enter()
      .append('rect')
      .attr('width', this.xScaleInner.bandwidth())
      .attr('class', d => d.key)
      .attr('id', function(d) {
        return data[this.parentNode.id].value[d.key] === undefined
          ? 'null'
          : 'not-null'
      })
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', function(d) {
        return this.id !== 'null'
          ? yScale(data[this.parentNode.id].value[d.key])
          : 0
      })
      .attr('height', function(d) {
        return this.id !== 'null'
          ? height - yScale(data[this.parentNode.id].value[d.key])
          : 0
      })

    // Null Symbol
    this.rects
      .nodes()
      .filter(d => d.id === 'null')
      .forEach(d =>
        d3
          .select(d.parentNode)
          .append('text')
          .attr('class', 'null-symbol')
          .attr('fill', '#fff')
          .attr('x', this.xScaleInner(d.className.baseVal))
          .attr('y', height - height / 40)
          .style('font-size', this.width / 70)
          .text('x')
      )

    // Gray Background Bar
    this.bar
      .selectAll('rects')
      .data(this.keys, k => k.key)
      .enter()
      .append('rect')
      .attr('width', this.xScaleInner.bandwidth())
      .attr('class', 'backbar')
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', yScale(1))
      .attr('height', height)

    this.bar.exit().remove()
  }
}
