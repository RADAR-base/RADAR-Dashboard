import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import { MatPaginator } from '@angular/material'
import { Router } from '@angular/router'

import { Subject } from '../../../shared/models/subject.model'
import { SubjectDataSource } from './subject-data-source'
import { SubjectDB } from './subject-db'

@Component({
  selector: 'app-subject-table',
  templateUrl: 'subject-table.component.html',
  styleUrls: ['subject-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'subjectId',
    'humanReadableId',
    'subjectStatus',
    'deviceStatus',
    'sources',
    'lastSeen'
  ]
  dataSource: SubjectDataSource | null
  subjectDB = new SubjectDB()

  @ViewChild(MatPaginator) paginator: MatPaginator

  @Output() openSubject = new EventEmitter<Subject>()

  @Input() isLoaded = false
  @Input() studyName
  @Input()
  set subjects(value) {
    this.subjectDB.data = value.map(d =>
      Object.assign({}, d, {
        deviceStatus: this.getDeviceStatus(d.sources)
      })
    )
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.dataSource = new SubjectDataSource(this.subjectDB, this.paginator)
  }

  ngOnDestroy() {
    this.dataSource.disconnect()
  }

  trackById(index, subject: Subject) {
    return subject.subjectId
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
}
