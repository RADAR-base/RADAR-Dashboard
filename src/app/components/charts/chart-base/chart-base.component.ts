import 'rxjs/add/operator/debounceTime'
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as d3 from 'd3'

import { Config } from '../../../shared/utils/config'

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
export class ChartBaseComponent implements AfterViewInit {
  @ViewChild('svg') svgRef: ElementRef

  data: any

  @Input()
  set chartData (value) {
    this.data = value
    this.beforeUpdate()
  }

  get chartData () {
    return this.data
  }

  @Input()
  margin = Config.CHART_MARGIN

  svg: any
  chart: any
  width: number
  height: number
  xAxis: any
  yAxis: any

  private window$: Observable<Event>

  ngAfterViewInit () {
    this.svg = d3.select(this.svgRef.nativeElement)
    this.beforeInit()
  }

  private beforeInit () {
    // Observe window resize and debounce events
    this.window$ = Observable.fromEvent(window, 'resize')
      .debounceTime(150)

    this.window$.subscribe(() => {
      this.beforeUpdate()
    })

    this.chart = this.svg.append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    this.xAxis = this.chart.append('g')
      .attr('class', 'axis axis--x')

    this.yAxis = this.chart.append('g')
      .attr('class', 'axis axis--y')

    this.init()
  }

  init () {
    this.beforeUpdate()
  }

  private beforeUpdate () {
    if (this.chart && this.data) {
      this.update()
    }
  }

  update () {
    this.beforeDraw()
  }

  private beforeDraw () {
    const svgEl = this.svg.node()
    const width = svgEl.clientWidth || svgEl.parentNode.clientWidth
    const height = svgEl.clientHeight || svgEl.parentNode.clientHeight

    this.width = width - this.margin.left - this.margin.right
    this.height = height - this.margin.top - this.margin.bottom

    this.chart
      .attr('width', this.width)
      .attr('height', this.height)

    this.draw()
  }

  draw () {}

}
