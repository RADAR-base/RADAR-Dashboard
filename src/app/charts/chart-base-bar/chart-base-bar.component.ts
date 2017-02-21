import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { TimeSeries } from '../../models/time-series.model'
import { Categorical } from '../../models/categorical.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-bar',
  template: '<svg #svg></svg>',
  styleUrls: ['./chart-base-bar.component.scss']
})
export class ChartBaseBarComponent extends ChartBaseComponent {
  @Input() categorical = false

  // data can be TimeSeries[] or Categorical[]
  data: any

  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  yAxis: any
  xScaleTime: any
  xScaleOrdinal: any
  yScale: any
  bar: any

  init () {
    super.init()
  }

  draw () {
    this.xScaleOrdinal = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.3)

    if (this.categorical) {
      this.xScaleOrdinal.domain(this.data.map(function (d: Categorical) { return d.name }))

      this.yScale = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.data, (d: Categorical) => d.value)])

      this.xAxis
        .attr('transform', `translate(0, ${this.yScale(0)})`)
        .call(d3.axisBottom(this.xScaleOrdinal))
    } else {
      this.xScaleTime = d3.scaleTime()
        .range([0, this.width - this.margin.right])
        .domain(d3.extent(this.data, (d: TimeSeries) => d.date))

      this.xScaleOrdinal.domain(this.data.map(function (d: TimeSeries) { return d.date }))

      this.yScale = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.data, (d: TimeSeries) => d.value)])

      this.xAxis
        .attr('transform', `translate(0, ${this.yScale(0)})`)
        .call(d3.axisBottom(this.xScaleTime))
    }

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    )

    this.chart.selectAll('rect').remove()

    this.bar = this.chart.selectAll('bar')
      .data(this.data)

    if (this.categorical) {
      this.bar.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => this.xScaleOrdinal(d.name))
        .attr('width', this.xScaleOrdinal.bandwidth())
        .attr('y', d => this.yScale(d.value))
        .attr('height', d => this.height - this.yScale(d.value))
    } else {
      this.bar.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => this.xScaleTime(d.date))
        .attr('width', this.xScaleOrdinal.bandwidth())
        .attr('y', d => this.yScale(d.value))
        .attr('height', d => this.height - this.yScale(d.value))
    }

    this.bar.exit().remove()
  }
}
