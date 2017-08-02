import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { MdPaginator } from '@angular/material'

import { SubjectDataSource } from './subject-data-source'
import { SubjectDB } from './subject-db'

@Component({
  selector: 'app-subject-table',
  styleUrls: ['subject-table.component.scss'],
  templateUrl: 'subject-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectTableComponent implements OnInit, OnDestroy {

  displayedColumns = ['subjectId', 'active', 'startdate', 'enddate', 'sources']
  dataSource: SubjectDataSource | null
  subjectDB = new SubjectDB()

  @ViewChild(MdPaginator) paginator: MdPaginator

  @Input()
  set subjects (value) {
    this.subjectDB.data = value
  }

  ngOnInit () {
    this.dataSource = new SubjectDataSource(this.subjectDB, this.paginator)
  }

  ngOnDestroy () {
    this.dataSource.disconnect()
  }

  trackById (index, subject) {
    return subject
      ? subject.subjectId
      : undefined
  }

}
