import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

import { MultiTimeSeries } from '../../models/multi-time-series.model';
import { ChartBaseComponent } from '../chart-base/chart-base.component';
import { AppConfig } from '../../shared/app.config';

@Component({
  selector: 'app-chart-base-multi-line',
  template: '',
  styleUrls: ['./chart-base-multi-line.component.scss']
})
export class ChartBaseMultiLineComponent extends ChartBaseComponent {
  data: MultiTimeSeries[];

  @Input() lineColors = AppConfig.CHART_CATEGORICAL_COLORS;

  svg: any;
  chart: any;
  width: number;
  height: number;
  xScale: any;
  yScale: any;
  zScale: any;
  xAxis: any;
  yAxis: any;
  lines: any;
  line: any;

  init() {
    this.line = d3.line()
      .curve(d3.curveBasis)
      .x((d: any) => this.xScale(d.date))
      .y((d: any) => this.yScale(d.value));

    super.init();
  }

  draw() {
    const minDate = d3.min(this.data, row => d3.min(row.values, d => d.date));
    const maxDate = d3.max(this.data, row => d3.max(row.values, d => d.date));

    this.xScale = d3.scaleTime()
      .range([0, this.width])
      .domain([minDate, maxDate]);

    const minValue = d3.min(this.data, row => d3.min(row.values, d => d.value));
    const maxValue = d3.max(this.data, row => d3.max(row.values, d => d.value));

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([minValue, maxValue]);

    this.zScale = d3.scaleOrdinal()
      .domain(this.data.map(d => d.id))
      .range(this.lineColors);

    this.xAxis
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    );

    this.lines = this.chart.selectAll('.line')
      .data(this.data, d => d.id)
      .enter().append('path')
      .attr('class', 'line')
      .attr('d', d => this.line(d.values))
      .style('stroke', d => this.zScale(d.id));
  }
}
