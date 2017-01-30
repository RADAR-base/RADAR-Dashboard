import { Component } from '@angular/core';
import * as d3 from 'd3';

import { MultiTimeSeries } from '../../models/multi-time-series.model';
import { ChartBaseComponent } from '../chart-base/chart-base.component';

@Component({
  selector: 'app-chart-base-multi-line',
  template: '',
  styleUrls: ['./chart-base-multi-line.component.scss']
})
export class ChartBaseMultiLineComponent extends ChartBaseComponent {
  data: MultiTimeSeries[];

  svg: any;
  chart: any;
  width: number;
  height: number;
  xAxis: any;
  yAxis: any;
  xScale: any;
  yScale: any;
  zScale: any;
  lines: any;

  init() {
    super.init();
  }

  draw() {

    var d = d3;
    d;

    var xScale = d3.scaleTime();
    xScale.range([0, this.width]);
    var yScale = d3.scaleLinear();
    yScale.range([this.height, 0]);

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d: any) { return xScale(d.date); })
      .y(function(d: any) { return yScale(d.val); });

    let minDate = new Date(d3.min(this.data[0].vals, function(v: any) {return v.date;}));
    let maxDate = new Date(d3.max(this.data[0].vals, function(v: any) {return v.date;}));
    xScale.domain([minDate, maxDate]);

    yScale.domain([0, d3.max(this.data, function(el: any) { return d3.max(el.vals, function(d: any) { return d.val; }); })]);

    var axisIds = d3.map(this.data.map(function (axis: any) {return axis.vals[0];}), function(d) {return d.id;}).keys();
    var zScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(axisIds);

    this.xAxis
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(xScale));

    this.yAxis.call(
      d3.axisLeft(yScale)
        .tickSize(-this.width)
    );

    this.chart.selectAll(".line").remove();

    this.lines = this.chart.selectAll(".line")
      .data(this.data.map(function (axis: any) {return axis.vals;}))
      .attr("class","line");

    this.lines.enter()
      .append("path")
      .attr("class","line")
      .attr("d",line)
      .style("stroke",function(d) { return zScale(d[0].id); });

  }
}
