import { ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as d3 from 'd3';

import { AppConfig } from '../../shared/app.config';

export class ChartBase {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  data: any;

  @Input()
  set chartData(value) {
    this.data = value;
    this.update();
  }

  get chartData() {
    return this.data;
  }

  @Input()
  margin = AppConfig.CHART_MARGIN;

  svg: any;
  chart: any;
  width: number;
  height: number;
  xAxis: any;
  yAxis: any;

  private window$: Observable<Event>;

  init() {
    // Observe window resize and debounce events
    this.window$ = Observable.fromEvent(window, 'resize')
      .debounceTime(150);

    this.window$.subscribe(() => {
      this.update();
    });

    this.svg = d3.select(this.chartContainer.nativeElement);

    this.chart = this.svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.xAxis = this.chart.append('g')
      .attr('class', 'axis axis--x');

    this.yAxis = this.chart.append('g')
      .attr('class', 'axis axis--y');

    this.afterInit();
  }

  afterInit() {
    this.update();
  }

  update() {
    if (this.chart && this.data) {
      this.beforeDraw();
    }
  }

  beforeDraw() {
    let svgEl = this.chartContainer.nativeElement;
    let width = svgEl.clientWidth || svgEl.parentNode.clientWidth;
    let height = svgEl.clientHeight || svgEl.parentNode.clientHeight;

    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;

    this.chart
      .attr('width', this.width)
      .attr('height', this.height);

    this.draw();
  }

  draw() {}
}
