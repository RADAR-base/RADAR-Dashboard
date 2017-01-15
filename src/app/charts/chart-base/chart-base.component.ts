import 'rxjs/add/operator/debounceTime';

import { Component, AfterViewInit } from '@angular/core';
import { ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as d3 from 'd3';

import { AppConfig } from '../../shared/app.config';

/**
 *  BaseComponent to be extended by chart components
 *
 *  The component appends an SVG element, it doesn't need a template.
 *  It has an empty template for testing purposes only.
 *
 *  Use the following lifecycle methods in the extended components:
 *  1. init() use to initiate the chart elements
 *  2. update() use if you need to update values before draw()
 *  3. draw() use to draw the chart elements
 */
@Component({
  template: '',
})
export class ChartBaseComponent implements AfterViewInit {

  data: any;

  @Input()
  set chartData(value) {
    this.data = value;
    this.beforeUpdate();
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

  constructor(
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.svg = d3.select(this.elementRef.nativeElement)
      .append('svg');

    this.beforeInit();
  }

  private beforeInit() {
    // Observe window resize and debounce events
    this.window$ = Observable.fromEvent(window, 'resize')
      .debounceTime(150);

    this.window$.subscribe(() => {
      this.beforeUpdate();
    });

    this.chart = this.svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.xAxis = this.chart.append('g')
      .attr('class', 'axis axis--x');

    this.yAxis = this.chart.append('g')
      .attr('class', 'axis axis--y');

    this.init();
  }

  init() {
    this.beforeUpdate();
  }

  private beforeUpdate() {
    if (this.chart && this.data) {
      this.update();
    }
  }

  update() {
    this.beforeDraw();
  }

  private beforeDraw() {
    const svgEl = this.svg.node();
    const width = svgEl.clientWidth || svgEl.parentNode.clientWidth;
    const height = svgEl.clientHeight || svgEl.parentNode.clientHeight;

    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;

    this.chart
      .attr('width', this.width)
      .attr('height', this.height);

    this.draw();
  }

  draw() {}
}
