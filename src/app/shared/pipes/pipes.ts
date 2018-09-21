import { Pipe, PipeTransform } from '@angular/core'

import { TimeWindow } from '../enums/time-window.enum'

@Pipe({ name: 'dateCalc' })
export class DateCalcPipe implements PipeTransform {
  transform(date: Date, date_factor: string, jump: string) {
    switch (date_factor) {
      case 'ONE_DAY':
        if (jump === 'forward') {
          return new Date(date.getTime() + TimeWindow['ONE_DAY'])
        } else {
          return new Date(date.getTime() - TimeWindow['ONE_DAY'])
        }
      default:
        return date
    }
  }
}

// NOTE: This pipe shortens multiple word strings to its initials.
// Example: From 'Electrodermal Activity' to 'EA'
@Pipe({ name: 'shorten' })
export class ShortenLabelPipe implements PipeTransform {
  transform(label: string) {
    if (label.indexOf(' ') > 0) {
      return label
        .split(' ')
        .map(d => d[0])
        .join('')
    }
    return label
  }
}
