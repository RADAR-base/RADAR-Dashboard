import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
    'status',
    'lastSeen',
    'sources'
  ]
  dataSource: SubjectDataSource | null
  subjectDB = new SubjectDB()

  @ViewChild(MatPaginator) paginator: MatPaginator

  @Input() studyName
  @Input()
  set subjects(value) {
    this.subjectDB.data = value
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

  openSubjectPage(event, subjectId) {
    this.router.navigateByUrl(`/study/${this.studyName}/subject/${subjectId}`)
  }
}
