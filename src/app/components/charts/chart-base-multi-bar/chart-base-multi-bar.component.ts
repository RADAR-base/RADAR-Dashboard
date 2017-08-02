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
      .paddingInner(0.3)

    this.xScale0 = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.4)

    this.yScale = d3.scaleLinear()
      .rangeRound([this.height, 0])

    this.dates = this.data.map(function (d) { return d.date })
    this.types = this.data[0].compliances.map(function (d) { return d.type })

    this.xScale0.domain (this.dates)
    this.xScale1.domain (this.types)
           .rangeRound([0, this.xScale0.bandwidth()])
    this.yScale.domain ([0, 1])

    this.xAxis
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.xScale0)
                .tickValues(this.xScale0.domain().filter(function (d, i) { return !(i % 2) })))

    this.yAxis.call(
        d3.axisLeft(this.yScale)
        .tickSize(-this.width)
        .ticks(4, '%')
        .tickValues([0,.25,.50,0.75,1])
    )

    const xScale0 = this.xScale0
    const xScale1 = this.xScale1
    const yScale = this.yScale

    this.chart.selectAll('rect').remove()

    this.bar = this.chart.selectAll('bar')
        .data(this.data)
        .enter().append('g')
        .attr('class', 'g')
        .attr('transform', (d) => `translate(${xScale0(d.date)}, 0)`)

    this.bar.selectAll('g')
            .data((d) => d.compliances)
            .enter().append('rect')
            .attr('width', xScale1.bandwidth())
            .attr('class', (d) => d.type.toLowerCase())
            .attr('x', (d) => xScale1(d.type))
            .attr('y', (d) => yScale(d.compliance))
            .attr('height', (d) => this.height - yScale(d.compliance))

    this.bar.selectAll('bar')
           .data((d) => d.compliances)
           .enter().append('rect')
           .attr('width', xScale1.bandwidth())
           .attr('class', 'backbar')
           .attr('x', (d) => xScale1(d.type))
           .attr('y', (d) => yScale(1) )
           .attr('height', (d) => yScale(d.compliance) )

    this.bar.exit().remove()
  }
}
