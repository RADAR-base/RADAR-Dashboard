import { Component, ViewChild, Input, OnInit } from '@angular/core'
import { MdPaginator } from '@angular/material'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'

import { SubjectDataSource } from './subject-data-source'

@Component({
  selector: 'app-subject-table',
  styleUrls: ['subject-table.component.scss'],
  templateUrl: 'subject-table.component.html'
})
export class SubjectTableComponent implements OnInit {

  @Input() subjects
  displayedColumns = ['subjectId', 'active', 'startdate', 'enddate', 'sources']
  dataSource: SubjectDataSource | null

  @ViewChild(MdPaginator) paginator: MdPaginator

  ngOnInit () {
    this.dataSource = new SubjectDataSource(this.subjects, this.paginator)
  }

  trackById (index, subject) {
    return subject ? subject.subjectId : undefined
  }

}
