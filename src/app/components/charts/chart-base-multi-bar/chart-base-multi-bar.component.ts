import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ConfigKey } from '../../../shared/models/config.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseMultiBarComponent extends ChartBaseComponent {
  @Input() categorical = false
  @Input() paddingInner = 0.3
  @Input() paddingOuter = 0.4
  @Input() yScaleDomain = [0, 1]
  @Input() yTicks = [0, 0.25, 0.5, 0.75, 1]
  @Input() yTickFormat = '.0%' // https://github.com/d3/d3-format
  @Input() xTickTimeFormat = '%d %b' // https://github.com/d3/d3-time-format
  @Input() xTickEvery = 2

  keys: ConfigKey[]
  dates: Date[]
  bar: any
  xScaleOuter: any
  xScaleInner: any
  legend: any
  rects: any
  colorScale: any

  init() {
    this.colorScale = d3
      .scaleOrdinal()
      .domain(this.keys.map(k => k.key))
      .range(this.colors)

    super.init()
  }

  draw() {
    this.xScaleInner = d3.scaleBand().paddingInner(this.paddingInner)

    this.xScaleOuter = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(this.paddingOuter)

    this.xScaleOuter.domain(this.data.map(d => d.date))

    this.yScale = d3
      .scaleLinear()
      .rangeRound([this.height, 0])
      .domain(this.yScaleDomain)

    this.xScaleInner
      .domain(this.keys.map(d => d.key))
      .rangeRound([0, this.xScaleOuter.bandwidth()])

    this.xAxis.attr('transform', `translate(0, ${this.height})`).call(
      d3
        .axisBottom(this.xScaleOuter)
        .tickFormat(d3.timeFormat(this.xTickTimeFormat))
        .tickValues(
          this.xScaleOuter.domain().filter((d, i) => !(i % this.xTickEvery))
        )
    )

    this.hasYAxis &&
      this.yAxis.call(
        d3
          .axisLeft(this.yScale)
          .tickSize(-this.width)
          .tickFormat(d3.format(this.yTickFormat))
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
      .style('fill', d => this.colorScale(d.key))
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
          .attr('y', height - height / 40) // TODO: remove harcoded value
          .style('font-size', this.width / 70) // TODO: remove harcoded value
          .text('x')
      )

    // Gray Background Bar
    this.bar
      .selectAll('rects')
      .data(this.keys, k => k.key)
      .enter()
      .append('rect')
      .attr('width', this.xScaleInner.bandwidth())
      .attr('class', 'back-bar')
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', yScale(this.yScaleDomain[this.yScaleDomain.length - 1]))
      .attr('height', height)

    this.bar.exit().remove()
  }
}
