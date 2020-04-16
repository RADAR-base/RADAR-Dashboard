import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs'

import { Subject } from '../../../shared/models/subject.model'
import { SubjectDataSource } from './subject-data-source'
import { SubjectDB } from './subject-db'

@Component({
  selector: 'app-subject-table',
  templateUrl: 'subject-table.component.html',
  styleUrls: ['subject-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectTableComponent implements OnInit, OnDestroy, OnChanges {
  PROJECT_MDD = 'MDD'
  PROJECT_MS = 'MS'
  displayedColumns = [
    'subjectId',
    'humanReadableId',
    'subjectStatus',
    'enrolmentDate',
    'lastModifiedDate',
    'sources',
    'nextTaskDate',
    'lastResetDate',
    'lastRemoveDate',
    'appVersion'
  ]
  dataSource
  // : SubjectDataSource | null
  subjectDB = new SubjectDB()

  @ViewChild(MatPaginator) paginator: MatPaginator

  @ViewChild(MatSort) sort: MatSort

  @Output() openSubject = new EventEmitter<Subject>()

  @Input() isLoaded = false

  @Input() studyName

  @Input() appResets
  @Input() appRemoves
  @Input() appVersions

  @Input()
  set subjects(value) {
    this.subjectDB.data = value.map(d =>
      Object.assign({}, d, {
        deviceStatus: this.getDeviceStatus(d.sources),
        enrolmentDate: new Date(d.createdDate),
        nextTaskDate: this.getNextTaskDate(d.createdDate),
        lastResetDate: this.getLastResetDate(d.login),
        appVersion: this.getAppVersion(d.login),
        lastRemoveDate: this.getLastRemoveDate(d.login)
      })
    )
  }

  scheduleIncrDays: number

  ngOnChanges() {
    this.getSubjects()
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator = this.paginator
    if (this.studyName.includes(this.PROJECT_MDD)) {
      this.scheduleIncrDays = 14
    } else {
      this.scheduleIncrDays = 42
    }
  }

  ngOnDestroy() {
    this.dataSource.disconnect()
  }

  getSubjects() {
    if (this.dataSource) {
      this.dataSource.data = this.subjectDB.data
      this.dataSource.sort = this.sort
    }
  }

  trackById(index, subject: Subject) {
    return subject.id
  }

  openSubjectHandler(event, subject) {
    this.openSubject.emit(subject)
  }

  getDeviceStatus(sources) {
    sources = sources.map(d => d.status)
    return sources
      .sort(
        (a, b) =>
          sources.filter(stat => stat === a).length -
          sources.filter(stat => stat === b).length
      )
      .pop()
  }

  getNextTaskDate(date) {
    const now = new Date()
    let newDate = moment(new Date(date))
      .startOf('day')
      .toDate()
    while (moment(newDate).isBefore(now)) {
      newDate = moment(new Date(newDate))
        .add(this.scheduleIncrDays, 'days')
        .toDate()
    }
    return newDate
  }

  getLastResetDate(subjectId) {
    const reset = this.appResets.find(r => subjectId === r['subjectId'])
    console.log(reset)
    if (reset) {
      return new Date(Number(reset['event_timestamp'] / 1000))
    } else {
      return undefined
    }
  }

  getLastRemoveDate(subjectId) {
    const reset = this.appRemoves.find(r => subjectId === r['subjectId'])
    console.log(reset)
    if (reset) {
      return new Date(Number(reset['event_timestamp'] / 1000))
    } else {
      return undefined
    }
  }

  getAppVersion(subjectId) {
    const data = this.appVersions.find(r => subjectId === r['subjectId'])
    if (data) {
      return data.version
    } else {
      return undefined
    }
  }
}
