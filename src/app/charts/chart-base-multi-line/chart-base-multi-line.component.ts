import { ChangeDetectionStrategy, Component } from '@angular/core'
import * as d3 from 'd3'
import { lineChunked } from 'd3-line-chunked'

import { ChartData } from '../../shared/models/chart-data.model'
import { ChartBaseComponent } from '../chart-base/chart-base.component'

@Component({
  selector: 'app-chart-base-multi-line',
  templateUrl: '../charts.common.html',
  styleUrls: ['./chart-base-multi-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseMultiLineComponent extends ChartBaseComponent {
  data: ChartData[]
  colorScale: any
  lineChunkedFunctions: { [key: string]: Function } = {}
  lines: any
  line: any
  lineGroup: any
  legend
  legendPos
  legendOffset
  legendMargin = 10

  init() {
    this.lineGroup = this.chart.append('g')

    this.colorScale = d3
      .scaleOrdinal()
      .domain(this.keys.map(k => k.key))
      .range(this.colors)

    this.keys.map(k => {
      this.lineChunkedFunctions[k.key] = lineChunked()
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.value[k.key]))
        .curve(d3.curveMonotoneX)
        .defined(d => d.value)
        .lineStyles({ stroke: this.colorScale(k.key) })
        .pointStyles({ fill: this.colorScale(k.key) })
        .pointAttrs({ r: 1.5 })
    })

    super.init()
  }

  draw() {
    // CHART

    this.xScale = d3
      .scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, d => d.date))
      .nice()

    if (this.hasXAxis) {
      this.xAxis.call(d3.axisBottom(this.xScale))
    }

    const minValue = d3.min(
      this.keys.map(k => d3.min(this.data, d => d.value && d.value[k.key]))
    )

    const maxValue = d3.max(
      this.keys.map(k => d3.max(this.data, d => d.value && d.value[k.key]))
    )

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([minValue, maxValue])
      .nice()

    if (this.hasYAxis) {
      this.yAxis.call(d3.axisLeft(this.yScale).tickSize(-this.width))
    }

    this.lineGroup.selectAll('.line').remove()

    this.keys.map(k => {
      this.lineGroup
        .append('g')
        .attr('class', `line ${k.key}`)
        .datum(this.data)
        .call(this.lineChunkedFunctions[k.key])
        .attr('opacity', 0)
        .transition()
        .attr('opacity', 1)
        .duration(500)
    })

    // LEGEND

    this.chart.selectAll('.legend_wrap').remove()

    this.legendOffset = this.width / 14
    this.legendPos = this.legendMargin

    this.legend = this.chart
      .append('g')
      .attr('class', 'legend_wrap')
      .append('svg')
      .attr('x', this.width / 1.35)
      .attr('y', -30)
      .attr('width', this.width)
      .attr('height', this.height - 100)

    this.legend
      .append('rect')
      .attr('width', this.width / 4)
      .attr('rx', '4')
      .attr('ry', '4')
      .attr('class', 'legends')

    this.legend = this.legend
      .selectAll('.legend_wrap')
      .data(this.keys.map(d => d.label.EN))
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', d => {
        const new_legend_pos = this.legendPos
        this.legendPos += d.length + this.legendOffset
        return `translate(${new_legend_pos}, ${this.legendMargin / 2})`
      })

    this.legend
      .append('circle')
      .attr('cx', 8)
      .attr('cy', 6)
      .attr('r', 5)
      .style('fill', (d, i) => this.colorScale(this.keys[i].key))

    this.legend
      .append('text')
      .attr('class', 'text')
      .attr('x', this.legendMargin * 2)
      .attr('y', this.legendMargin)
      .text(d => d)
  }
}
