import { Component } from '@angular/core';
import * as d3 from 'd3';

import { TimeSeries } from '../../models/time-series.model';
import { ChartBaseComponent } from '../chart-base/chart-base.component';

@Component({
  selector: 'app-chart-base-bar',
  template: '<svg #svg></svg>',
  styleUrls: ['./chart-base-bar.component.scss']
})
export class ChartBaseBarComponent extends ChartBaseComponent {
  data: TimeSeries[];

  svg: any;
  chart: any;
  width: number;
  height: number;
  xAxis: any;
  yAxis: any;
  xScaleTime: any;
  xScaleOrdinal: any;
  yScale: any;
  bar: any;

  init() {
    super.init();
  }

  draw() {
    this.xScaleTime = d3.scaleTime()
      .range([0, this.width - this.margin.right])
      .domain(d3.extent(this.data, d => d.date));

    this.xScaleOrdinal = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.2)
      .domain(this.data.map(function(d: any) { return d.date; }));

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, d => d.value)]);

    this.xAxis
      .attr('transform', `translate(0, ${this.yScale(0)})`)
      .call(d3.axisBottom(this.xScaleTime));

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    );

    this.chart.selectAll('rect').remove();

    this.bar = this.chart.selectAll('bar')
      .data(this.data);

    this.bar.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScaleTime(d.date))
      .attr('width', this.xScaleOrdinal.bandwidth())
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.height - this.yScale(d.value));

    this.bar.exit().remove();

  }
}
