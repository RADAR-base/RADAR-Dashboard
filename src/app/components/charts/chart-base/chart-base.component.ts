import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import * as d3 from 'd3'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { AppConfig } from '../../../shared/utils/config'

/**
 *  BaseComponent to be extended by chart components
 *
 *  Components that extend this component
 *  must to include the following element in their template:
 *  `<svg #svg></svg>`
 *
 *  Use the following lifecycle methods in the extended components:
 *  1. init() use to initiate the chart elements
 *  2. update() use if you need to update values before draw()
 *  3. draw() use to draw the chart elements
 */
@Component({
  templateUrl: '../charts.common.html'
})
export class ChartBaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svg') svgRef: ElementRef

  @Input() margin = AppConfig.charts.MARGIN
  @Input()
  get chartData() {
    return this.data
  }

  set chartData(value) {
    this.data = value
    this.beforeUpdate()
  }

  @Output() onMove = new EventEmitter<Date>()

  data: any
  svg: any
  chart: any
  tooltip: any
  width: number
  height: number
  xScale: any
  yScale: any
  xAxis: any
  yAxis: any
  window$: Subscription
  bisect: any

  ngAfterViewInit() {
    this.svg = d3.select(this.svgRef.nativeElement)
    this.beforeInit()
  }

  init() {
    this.beforeUpdate()
  }

  update() {
    this.beforeDraw()
  }

  draw() {}

  ngOnDestroy() {
    this.window$.unsubscribe()
  }

  private beforeInit() {
    // Observe window resize and debounce events
    this.window$ = Observable.fromEvent(window, 'resize')
      .debounceTime(150)
      .subscribe(() => {
        this.beforeUpdate()
      })

    const chartTranslate = `translate(${this.margin.left}, ${this.margin.top})`

    this.bisect = d3.bisector(function(d) {
      return d['date']
    }).right

    this.chart = this.svg
      .append('g')
      .attr('class', 'chart')
      .attr('transform', chartTranslate)

    this.xAxis = this.chart.append('g').attr('class', 'axis axis--x')

    this.yAxis = this.chart.append('g').attr('class', 'axis axis--y')

    this.tooltip = this.svg
      .append('g')
      .attr('transform', chartTranslate)
      .append('rect')
      .attr('class', 'tooltip-box')
      .on('mousemove', () => this.tooltipMouseMove())

    this.init()
  }

  private tooltipMouseMove() {
    if (!this.xScale) return

    const dates = this.data.map(d => d.date)
    const date =
      dates[
        this.bisect(
          this.data,
          this.xScale.invert(d3.mouse(this.tooltip.node())[0])
        )
      ]
    this.onMove.emit(date)
  }

  private beforeUpdate() {
    if (this.chart && this.data) {
      this.update()
    }
  }

  private beforeDraw() {
    const svgEl = this.svg.node()
    const width = svgEl.clientWidth || svgEl.parentNode.clientWidth
    const height = svgEl.clientHeight || svgEl.parentNode.clientHeight

    this.width = width - this.margin.left - this.margin.right
    this.height = height - this.margin.top - this.margin.bottom

    this.chart.attr('width', this.width).attr('height', this.height)
    this.tooltip.attr('width', this.width).attr('height', this.height)

    this.draw()
  }
}
