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

    this.legend = this.chart
      .append('g')
      .attr('class', 'legend')
      .append('svg')
      .attr('x', this.width - 250)
      .attr('y', -20)
      .attr('width', this.width)
      .attr('height', this.height - 100)

    let dataL = 0
    const offset = 80

    this.legend
      .append('rect')
      .attr('width', '25%')
      .attr('height', '20%')
      .attr('fill', '#0b4a59')
      .attr('rx', '4')
      .attr('ry', '4')
      .attr('fill-opacity', 0.2)
      .attr('class', 'legend')

    this.legend = this.legend
      .selectAll('.legend')
      .data(this.keys.map(d => d.label.EN))
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('margin', 10)
      .attr('transform', function(d, i) {
        if (i === 0) {
          dataL = d.length + offset
          return 'translate(0,5)'
        } else {
          const newdataL = dataL
          dataL += d.length + offset
          return 'translate(' + newdataL + ',5)'
        }
      })

    this.legend
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5)
      .attr('r', 4)
      .style('fill', (d, i) => this.colorScale(d.key))

    this.legend
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text(d => d)
      .attr('class', 'text')
      .style('text-anchor', 'start')
      .style('fill', 'white')
      .attr('font-size', 10)
  }
}
