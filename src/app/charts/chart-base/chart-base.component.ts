import 'd3-selection-multi'

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
import { ChartData } from '../../shared/models/chart-data.model'
import { ConfigKey } from '../../shared/models/config.model'
import { arraysEqual } from '../../shared/utils/arrays-equal'

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

  @Input() margin = { top: 16, right: 16, bottom: 32, left: 80 }
  @Input() color: string = ChartColors.c3
  @Input()
  colors: string[] = [
    ChartColors.c1,
    ChartColors.hover,
    ChartColors.c3,
    ChartColors.c2,
    ChartColors.c5,
    ChartColors.c6
  ]
  @Input() keys: any[]
  @Input() hasYAxis = false
  @Input() hasXAxis = false
  @Input() hasTooltip = false
  @Input() hasBrush = false
  @Input() sensorDataTimeFrame
  @Input() isSingle
  @Input() path
  @Input()
  get chartData() {
    return this.data
  }
  set chartData(value) {
    this.data = value
    this.beforeUpdate()

    if (this.sensorDataTimeFrame) {
      this.updateBrushFromSensorDates()
    }
  }

  @Output() tooltipMouseMove = new EventEmitter<Date>()
  @Output() brushMove = new EventEmitter<any>()

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
  brush: any
  brushWidthDefault = 120
  brushExtent
  brushExtentFromSensors
  brushUpdatedFromSensors: boolean
  clipOffset = 15
  legend
  legendXPos
  legendWrapYPos = -30
  legendWrapXPos
  legendOffset = 13
  legendMargin = 10
  legendCharSpace = 9
  legendWidth
  colorScale: any
  keyStrLength

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
      const x = this.xScale.invert(d3.mouse(this.tooltip.node())[0])
      const bisectDate = d3.bisector((d: ChartData) => d.date).left
      const index = bisectDate(this.chartData, x)
      const chart = this.chartData[index - 1]

      if (chart) {
        this.tooltipMouseMove.emit(chart.date)
      }
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
    const path = this.path

    this.width = width - this.margin.left - this.margin.right
    this.height = height - this.margin.top - this.margin.bottom

    this.chart.attr('width', this.width).attr('height', this.height)

    this.hasTooltip &&
      this.tooltip.attr('width', this.width).attr('height', height)

    this.draw()

    this.chart
      .append('clipPath')
      .attr('id', 'rect-clip')
      .append('rect')
      .attr('x', -this.clipOffset)
      .attr('width', this.width)
      .attr('height', this.height * 2)

    this.chart.selectAll('path').styles({
      'clip-path': function(d, i) {
        if (this.hasAttribute('clip-path')) {
          return (
            'url(' + path + '#' + this.getAttribute('clip-path').split('#')[1]
          )
        }
      }
    })

    // Legend

    if (this.keys) {
      this.chart.selectAll('.legend_wrap').remove()

      this.keyStrLength = this.isSingle
        ? Math.max(this.keys[0].length, this.legendMargin)
        : this.keys.map(d => d.label.EN)[0].length

      this.legendXPos = 10
      this.legendWidth =
        this.keyStrLength * this.legendCharSpace * this.keys.length +
        this.keys.length * this.legendOffset
      this.legendWrapXPos = this.width - 50 - this.legendWidth

      this.legend = this.chart
        .append('g')
        .attr('class', 'legend_wrap')
        .append('svg')
        .attr('x', this.legendWrapXPos)
        .attr('y', this.legendWrapYPos)

      this.legend
        .append('rect')
        .attr('width', this.legendWidth)
        .attr('rx', '4')
        .attr('ry', '4')
        .attr('class', 'legends')

      this.legend = this.legend
        .selectAll('.legend_wrap')
        .data(this.isSingle ? this.keys : this.keys.map(d => d.label.EN))
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', d => {
          const new_legend_pos = this.legendXPos
          this.legendXPos += d.length * this.legendCharSpace + this.legendOffset
          return `translate(${new_legend_pos}, ${this.legendMargin / 2})`
        })

      this.legend
        .append('circle')
        .attr('cx', 8)
        .attr('cy', 6.5)
        .attr('r', 5)
        .style(
          'fill',
          this.isSingle
            ? this.color
            : (d, i) => this.colorScale(this.keys[i].key)
        )

      this.legend
        .append('text')
        .attr('class', 'legend-text')
        .attr('x', this.legendMargin * 2)
        .attr('y', this.legendMargin)
        .text(d => d)
    }
  }

  brushInit() {
    this.chart.selectAll('.brush').remove()

    this.brush = d3
      .brushX()
      .extent([[0, 0], [this.width, this.height]])
      .on('end', () => this.brushed())

    if (this.sensorDataTimeFrame) {
      this.updateBrushFromSensorDates()
    }

    this.chart
      .append('g')
      .attr('class', 'brush')
      .call(this.brush)
      .transition()
      .duration(1000)
      .call(
        this.brush.move,
        !this.brushExtentFromSensors
          ? [this.width - this.brushWidthDefault, this.width]
          : this.brushExtentFromSensors
      )
  }

  private brushed() {
    if (!this.brushUpdatedFromSensors) {
      this.brushExtent = d3.event.selection

      this.brushMove.emit([
        this.xScale.invert(this.brushExtent[0]),
        this.xScale.invert(this.brushExtent[1])
      ])
    } else {
      this.brushUpdatedFromSensors = false
      this.brushMove.emit(this.sensorDataTimeFrame)
    }
  }

  private updateBrushFromSensorDates() {
    const brushTimeStart = this.xScale(this.sensorDataTimeFrame[0])
    const brushTimeEnd = this.xScale(this.sensorDataTimeFrame[1])
    const temp_brushExtent = [brushTimeStart, brushTimeEnd]

    this.brushExtentFromSensors = [
      brushTimeStart < 0 ? 0 : brushTimeStart,
      brushTimeEnd > this.width ? this.width : brushTimeEnd
    ]
    if (!arraysEqual(temp_brushExtent, this.brushExtentFromSensors)) {
      this.brushUpdatedFromSensors = false
    } else {
      this.brushUpdatedFromSensors = true
    }
  }
}
