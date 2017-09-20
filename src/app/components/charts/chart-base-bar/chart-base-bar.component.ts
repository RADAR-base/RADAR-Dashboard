import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-bar',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseBarComponent extends ChartBaseComponent {
  @Input() categorical = false
  @Input() paddingInner = 0.2
  @Input() paddingOuter = 0.2

  data: ChartData[]
  xScaleTime: any
  xScaleOrdinal: any
  bar: any

  init() {
    super.init()
  }

  draw() {
    this.xScaleOrdinal = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(this.paddingInner)
      .paddingOuter(this.categorical ? this.paddingOuter : 0)

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, d => d.value as number)])

    if (this.categorical) {
      this.xScaleOrdinal.domain(this.data.map(d => d.name))
    } else {
      this.xScaleOrdinal.domain(this.data.map(d => d.date))
      this.xScaleTime = d3
        .scaleTime()
        .range([0, this.width])
        .domain(d3.extent(this.data, d => d.date))
    }

    this.hasXAxis &&
      this.xAxis
        .attr('transform', `translate(0, ${this.yScale(0)})`)
        .call(
          d3.axisBottom(this.categorical ? this.xScaleOrdinal : this.xScaleTime)
        )

    this.hasYAxis &&
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
