import { Component, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { TimeSeries } from '../../models/time-series.model';
import { ChartBase } from '../chart-base/chart-base';
import { AppConfig } from '../../shared/app.config';

@Component({
  selector: 'app-chart-base-line',
  template: `
    <svg #chartContainer></svg>
  `,
  styleUrls: ['./chart-base-line.component.scss']
})
export class ChartBaseLineComponent extends ChartBase implements AfterViewInit {
  data: TimeSeries[];

  @Input() gradientEnabled: boolean = false;
  @Input() gradientColors = AppConfig.CHART_GRADIENT_COLORS;
  @Input() gradientStops = AppConfig.CHART_GRADIENT_STOPS;

  svg: any;
  chart: any;
  width: number;
  height: number;
  xAxis: any;
  yAxis: any;
  xScale: any;
  yScale: any;
  line: any;
  lineEl: any;
  gradient: any;

  ngAfterViewInit() {
    this.init();
  }

  afterInit() {
    // Add HR Gradient
    if (this.gradientEnabled) {
      this.chart.classed('hr-gradient', true);

      this.gradient = this.svg.append('linearGradient');
      this.gradient
        .attr('id', 'hr-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('x2', 0)
        .selectAll('stop')
        .data(this.gradientColors)
        .enter().append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color);
    }

    this.lineEl = this.chart
      .append('path')
      .attr('class', 'line');

    this.line = d3.line()
      .curve(d3.curveBasis);

    super.afterInit();
  }

  draw() {
    this.xScale = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d: any) => d.date));

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, (d: any) => d.value)]);

    this.xAxis
      .attr('transform', `translate(0, ${this.yScale(0)})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    );

    // Add HR Gradient
    if (this.gradientEnabled) {
      this.gradient
        .attr('y1', this.yScale(this.gradientStops.y1))
        .attr('y2', this.yScale(this.gradientStops.y2));
    }

    this.line
      .x((d: any) => this.xScale(d.date))
      .y((d: any) => this.yScale(d.value));

    this.lineEl
      .datum(this.data)
      .attr('d', this.line);
  }
}
