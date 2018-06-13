import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import * as d3 from 'd3'
import { Subscription, fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import * as shortid from 'shortid'

import { ChartColors } from '../../shared/enums/chart-colors.enum'
import { ConfigKey } from '../../shared/models/config.model'

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
  templateUrl: '../charts.common.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svg') svgRef: ElementRef

  @Input() margin = { top: 16, right: 16, bottom: 32, left: 48 }
  @Input() color: string = ChartColors.c3
  @Input()
  colors: string[] = [
    ChartColors.c1,
    ChartColors.c2,
    ChartColors.c3,
    ChartColors.c4,
    ChartColors.c5,
    ChartColors.c6
  ]
  @Input() keys: ConfigKey[]
  @Input() hasYAxis = false
  @Input() hasXAxis = false
  @Input() hasTooltip = false
  @Input()
  get chartData() {
    return this.data
  }
  set chartData(value) {
    this.data = value
    this.beforeUpdate()
  }

  @Output() tooltipMouseMove = new EventEmitter<Date>()

  uid: string
  data: any[]
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

  ngAfterViewInit() {
    this.uid = shortid.generate()
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
    this.window$ = fromEvent(window, 'resize')
      .pipe(debounceTime(150))
      .subscribe(() => {
        this.beforeUpdate()
      })

    this.chart = this.svg
      .append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    if (this.hasXAxis) {
      this.xAxis = this.chart.append('g').attr('class', 'axis axis--x')
    }
    if (this.hasYAxis) {
      this.yAxis = this.chart.append('g').attr('class', 'axis axis--y')
    }

    if (this.hasTooltip) {
      this.tooltip = this.svg
        .append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .append('rect')
        .attr('class', 'tooltip-mouse-box')
        .attr('data-tooltipMouseBox', true)
        .on('mousemove', () => this.onTooltipMouseMove())
    }

    this.init()
  }

  private onTooltipMouseMove() {
    if (this.xScale) {
      this.tooltipMouseMove.emit(
        this.xScale.invert(d3.mouse(this.tooltip.node())[0])
      )
    }
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

    this.hasTooltip &&
      this.tooltip.attr('width', this.width).attr('height', height)

    this.draw()
  }
}
