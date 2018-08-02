import { Pipe, PipeTransform } from '@angular/core'

import { TimeWindow } from '../enums/time-window.enum'

@Pipe({ name: 'dateCalc' })
export class DateCalcPipe implements PipeTransform {
  transform(date: Date, date_factor: any, jump: any) {
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
