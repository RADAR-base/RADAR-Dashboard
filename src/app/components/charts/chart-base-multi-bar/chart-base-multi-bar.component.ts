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
  bar: any
  rects: any
  xScaleOuter: any
  xScaleInner: any
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
    this.bar && this.bar.remove()

    this.bar = this.chart
      .append('g')
      .selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${this.xScaleOuter(d.date)} ,0)`)

    this.rects = this.bar
      .selectAll('g')
      .data(d =>
        this.keys.map(k => ({
          key: k.key,
          value: d.value[k.key] === undefined ? null : d.value[k.key]
        }))
      )
      .enter()
      .append('g')
      .attr('class', 'bar')
      .classed('null', d => d.value === null)
      .append('rect')
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', d => (d.value === null ? 0 : this.yScale(d.value)))
      .attr('width', this.xScaleInner.bandwidth())
      .attr(
        'height',
        d => (d.value === null ? 0 : this.height - this.yScale(d.value))
      )
      .attr('fill', d => this.colorScale(d.key))

    // Null Symbol
    this.bar
      .selectAll('.null')
      .append('text')
      .text('\uE5CD')
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', this.height - 8)
      .attr('font-size', this.xScaleInner.bandwidth())

    // Gray Background Bar
    this.bar
      .selectAll('.bar')
      .append('rect')
      .attr('class', 'back-bar')
      .attr('x', d => this.xScaleInner(d.key))
      .attr('y', 0)
      .attr('width', this.xScaleInner.bandwidth())
      .attr('height', this.height)

    this.bar.exit().remove()
  }
}
