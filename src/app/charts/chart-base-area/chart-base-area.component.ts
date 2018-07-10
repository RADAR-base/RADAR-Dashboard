import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as d3 from 'd3'

import { ChartData } from '../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-area',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseAreaComponent extends ChartBaseComponent {
  data: ChartData[]
  area: any
  brush: any

  init() {
    this.area = d3.area<any>().defined(d => d.value)

    super.init()

    this.brushInit()
  }

  draw() {
    this.yScale = d3
      .scaleLinear()
      .rangeRound([this.height, 0])
      .domain(d3.extent(this.data, d => d.value as number))

    this.xScale = d3
      .scaleTime()
      .rangeRound([0, this.width])
      .domain(d3.extent(this.data, d => d.date))
      .nice()

    this.hasYAxis &&
      this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))

    this.hasXAxis &&
      this.xAxis
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.xScale).tickSize(-this.height))

    this.chart.selectAll('.area').remove()

    this.area
      .x(d => this.xScale(d.date))
      .y0(this.yScale(0))
      .y1(d => this.yScale(d.value))

    this.chart
      .append('path')
      .datum(this.data)
      .attr('class', 'area')
      .attr('d', this.area)
  }

  brushInit() {
    this.brush = d3
      .brushX()
      .extent([[0, 0], [this.width, this.height]])
      .on('end', () => this.brushed(this.xScale))

    this.chart
      .append('g')
      .attr('class', 'brush')
      .call(this.brush)
  }

  brushed(xScale) {
    const extent = d3.event.selection
    const extent_snapped = []
    const bisectDate = d3.bisector((d: ChartData) => d.date).left

    const chart_data0 = this.chartData[
      bisectDate(this.chartData, xScale.invert(extent[0]))
    ]

    const chart_data1 = this.chartData[
      bisectDate(this.chartData, xScale.invert(extent[1]))
    ]
    extent_snapped[0] = xScale(new Date(chart_data0.date))
    extent_snapped[1] = xScale(new Date(chart_data1.date))

    d3.selectAll('.brush')
      .select('.selection')
      .transition()
      .attr('width', extent_snapped[1] - extent_snapped[0])
      .attr('x', extent_snapped[0])
  }
}
