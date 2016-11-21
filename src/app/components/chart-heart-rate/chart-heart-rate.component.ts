import {
  Component, ElementRef, ViewChild, Input, AfterViewInit
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart-heart-rate',
  template: `
    <svg #chartContainer (window:resize)="onResize()"></svg>
  `,
  styleUrls: ['./chart-heart-rate.component.scss']
})
export class ChartHeartRateComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() data;
  @Input() config;

  private margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  private svg: SVGElement;
  private chart: any;
  private width: number;
  private height: number;
  // private xScale: any;
  // private yScale: any;
  // private xAxis: any;
  // private yAxis: any;

  constructor() {
  }

  ngAfterViewInit() {
    // needs to wait for the changes in the grid
    // TODO: research a better solution
    setTimeout(() => this.initChart(), 100);
  }

  initChart() {
    this.svg = this.chartContainer.nativeElement;

    this.chart = d3.select(this.svg).append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.chart.append('rect')
      .attr('class', 'bg');

    this.updateChart();
  }

  updateChartValues() {
    this.width = this.svg.clientWidth - this.margin.left - this.margin.right;
    this.height = this.svg.clientHeight - this.margin.top - this.margin.bottom;
  }

  updateChart() {
    this.updateChartValues();
    this.chart.select('.bg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  onResize() {
    if (this.chart) {
      this.updateChart();
    }
  }
}
