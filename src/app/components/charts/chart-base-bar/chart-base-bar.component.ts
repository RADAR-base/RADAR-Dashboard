import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { Categorical, ChartData } from '../../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-bar.component.scss']
})
export class ChartBaseBarComponent extends ChartBaseComponent {
  @Input() categorical = false

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

  init() {
    super.init()
  }

  draw() {
    this.xScaleOrdinal = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.2)
      .paddingOuter(0.2)

    if (this.categorical) {
      this.xScaleOrdinal.domain(this.data.map((d: Categorical) => d.name))

      this.yScale = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.data, (d: Categorical) => d.value)])

      this.xAxis
        .attr('transform', `translate(0, ${this.yScale(0)})`)
        .call(d3.axisBottom(this.xScaleOrdinal))
    } else {
      this.xScaleOrdinal
        .paddingOuter(0)
        .domain(this.data.map((d: ChartData) => d.date))

      this.xScaleTime = d3
        .scaleTime()
        .range([0, this.width])
        .domain(d3.extent(this.data, (d: ChartData) => d.date))

      this.yScale = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.data, (d: ChartData) => d.value as number)])

      this.xAxis
        .attr('transform', `translate(0, ${this.yScale(0)})`)
        .call(d3.axisBottom(this.xScaleTime))
    }

    this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.chart.selectAll('rect').remove()

    this.bar = this.chart.selectAll('bar').data(this.data)

    this.bar
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScaleOrdinal(this.categorical ? d.name : d.date))
      .attr('width', this.xScaleOrdinal.bandwidth())
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.height - this.yScale(d.value))

    this.bar.exit().remove()
  }
}
