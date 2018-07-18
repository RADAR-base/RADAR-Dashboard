import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseBarComponent extends ChartBaseComponent {
  @Input() categorical = true
  @Input() paddingInner = 0
  @Input() paddingOuter = 0

  data: ChartData[]
  bar: any

  init() {
    super.init()
  }

  draw() {
    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, d => d.value as number)])
      .nice()

    if (this.categorical) {
      this.xScale = d3
        .scaleBand()
        .rangeRound([0, this.width])
        .paddingInner(this.paddingInner)
        .paddingOuter(this.categorical ? this.paddingOuter : 0)
        .domain(this.data.map(d => d.name))
    } else {
      this.xScale = d3
        .scaleTime()
        .rangeRound([0, this.width])
        .domain(d3.extent(this.data, d => d.date))
        .nice()
    }

    this.hasXAxis &&
      this.xAxis
        .attr(
          'transform',
          () =>
            this.categorical
              ? `translate(0, ${this.yScale(0)})`
              : `translate(0, ${this.height})`
        )
        .call(
          d3
            .axisBottom(this.xScale)
            .tickSize(this.categorical ? 0 : -this.height)
        )

    this.hasYAxis &&
      this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.chart.selectAll('rect').remove()

    this.bar = this.chart.selectAll('bar').data(this.data)

    this.bar
      .enter()
      .append('rect')
      .attr('class', () => (this.categorical ? 'bar' : 'bar-time'))
      .attr(
        'x',
        d => (this.categorical ? this.xScale(d.name) : this.xScale(d.date))
      )
      .attr(
        'width',
        this.categorical
          ? this.xScale.bandwidth()
          : this.width / this.data.length
      )
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.height - this.yScale(d.value))

    if (this.hasBrush) {
      super.brushInit()
    }

    this.bar.exit().remove()
  }
}
