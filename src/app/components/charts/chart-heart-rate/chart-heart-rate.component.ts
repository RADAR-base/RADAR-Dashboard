import {
  Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as d3 from 'd3';

import { HeartRate } from '../../../models/charts/heart-rate';
import * as fromRoot from '../../../reducers';
import * as hrAction from '../../../actions/charts/heart-rate';

@Component({
  selector: 'app-chart-heart-rate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
      <!-- TODO: Change select to MD2 when available -->
      <div class="item">
        <select name="statistic">
          <option value="average" selected>average</option>
          <option value="maximum">maximum</option>
          <option value="standard deviation">standard deviation</option>
          <option value="variance">variance</option>
          <option value="sum">sum</option>
          <option value="median">median</option>
          <option value="count">count</option>
          <option value="quartile deviation">quartile deviation</option>
          <option value="80th percentile">80th percentile</option>
          <option value="lower quartile">lower quartile</option>
          <option value="upper quartile">upper quartile</option>
        </select>
      </div>
      <div class="divider"></div>
      <div class="item">
        <md-checkbox [checked]="true" align="end">
          Min & Max
        </md-checkbox>
      </div>
    </div>
    <div #chartContainer class="container">
      <svg #svgContainer (window:resize)="onResize()"></svg>
    </div>
  `,
  styleUrls: ['chart-heart-rate.component.scss']
})
export class ChartHeartRateComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  @ViewChild('svgContainer') svgContainer: ElementRef;

  @Input() title: string;

  private data$: Observable<HeartRate[]>;
  private data: HeartRate[];

  private margin: any = { top: 16, bottom: 32, left: 48, right: 16 };
  private chartContainerEl: HTMLElement;
  private svg: any;
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private line: any;
  private lineEl: any;
  private gradient: any;
  private gradientColors = [
    { offset: '0%', color: '#2ED8E5' },
    { offset: '50%', color: '#F8E81C' },
    { offset: '100%', color: '#FF9100' }
  ];

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartHRData)
      .filter(data => !!data);

    this.data$.subscribe(
      data => {
        this.data = data;
        this.updateChart();
      }
    );
  }

  ngAfterViewInit() {
    // needs to wait for the changes in the grid
    // TODO: research a better solution, bad for testing!
    setTimeout(() => this.initChart(), 100);
    this.store.dispatch(new hrAction.Update('average'));
  }

  initChart() {
    this.chartContainerEl = this.chartContainer.nativeElement;
    this.svg = d3.select(this.svgContainer.nativeElement);

    this.chart = this.svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.xAxis = this.chart.append('g')
      .attr('class', 'axis axis--x');

    this.yAxis = this.chart.append('g')
      .attr('class', 'axis axis--y');

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

    this.lineEl = this.chart
      .append('path')
      .attr('class', 'line');

    this.line = d3.line()
      .curve(d3.curveBasis);

    this.updateChart();
  }

  updateChartValues() {
    this.width = this.chartContainerEl.clientWidth - this.margin.left - this.margin.right;
    this.height = this.chartContainerEl.clientHeight - this.margin.top - this.margin.bottom;
  }

  updateChart() {
    if (this.chart && this.data) {
      this.updateChartValues();
      this.drawChart();
    }
  }

  drawChart() {
    this.chart
      .attr('width', this.width)
      .attr('height', this.height);

    this.xScale = d3.scaleTime()
      .range([0, this.width])
      .domain(d3.extent(this.data, (d: any) => d.date));

    this.yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, (d: any) => d.value)]);

    this.gradient
      .attr('y1', this.yScale(60))
      .attr('y2', this.yScale(120));

    this.xAxis
      .attr('transform', `translate(0, ${this.yScale(0)})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis.call(
      d3.axisLeft(this.yScale)
        .tickSize(-this.width)
    );

    this.line
      .x((d: any) => this.xScale(d.date))
      .y((d: any) => this.yScale(d.value));

    this.lineEl
      .datum(this.data)
      .attr('d', this.line);
  }

  onResize() {
    // TODO: add debounce for better performance on window resize
    this.updateChart();
  }
}
