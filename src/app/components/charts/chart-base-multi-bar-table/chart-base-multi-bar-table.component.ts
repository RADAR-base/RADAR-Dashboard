import { Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-bar-table',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-bar-table.component.scss']
})
export class ChartBaseMultiBarTableComponent extends ChartBaseComponent {
  @Input() categorical = false

  data: any

  svg: any
  chart: any
  width: number
  height: number

  xAxis: any
  yAxis: any
  bar: any

  xScale0: any
  xScale1: any
  yScale: any

  legend: any

  dates: any
  types: any

  init () {
    super.init()
  }

  draw () {

    this.xScale1 = d3.scaleBand()

    this.xScale0 = d3.scaleBand()
      .rangeRound([0, this.height / 2])
      .padding(0.3)

    this.yScale = d3.scaleLinear()
      .rangeRound([this.width, 0])

    this.dates = this.data.map(function (d) { return d.date })
    this.types = this.data[0].compliances.map(function (d) { return d.type })

    this.xScale0.domain (this.dates)
    this.xScale1.domain (this.types)
           .rangeRound([0, this.xScale0.bandwidth()])
    this.yScale.domain ([0, 1])

    const xScale0 = this.xScale0
    const xScale1 = this.xScale1
    const yScale = this.yScale

    this.chart.selectAll('rect').remove()

    this.bar = this.chart.selectAll('bar')
        .data(this.data)
        .enter().append('g')
        .attr('class', 'g')
        .attr('transform', (d) => `translate(0, ${xScale0(d.date)})`)

    this.bar.selectAll('g')
            .data((d) => d.compliances)
            .enter().append('rect')
            .attr('height', xScale1.bandwidth() / 1.5)
            .attr('class', (d) => d.type.toLowerCase())
            .attr('y', (d) => xScale1(d.type) + 35)
            .attr('x', (d) => yScale(1) - 50)
            .attr('width', (d) => (this.width - yScale(d.compliance)) / 1.5)

    this.bar.selectAll('bar')
           .data((d) => d.compliances)
           .enter().append('rect')
           .attr('height', xScale1.bandwidth() / 1.5)
           .attr('class', 'backbar')
           .attr('y', (d) => xScale1(d.type) + 35)
           .attr('x', (d) => yScale(1) - 50)
           .attr('width', (d) => this.width / 1.5)

    this.bar.exit().remove()
  }
}
