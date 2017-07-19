import { Component, ViewChild, Input, OnInit } from '@angular/core'
import { DataSource } from '@angular/cdk'
import { MdPaginator } from '@angular/material'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'

import { Subject } from '../../../shared/store/subject/subject.model'

export class PatientDataSource extends DataSource<any> {
  mydata: Subject[]

  constructor (private subjects: Observable<Subject[]>, private _paginator: MdPaginator) {
    super()
    this.subjects.subscribe(res => this.mydata = res)
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect (): Observable<Subject[]> {
    const displayDataChanges = [
      this.subjects,
      this._paginator.page
    ]

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.mydata.slice()

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize
      return data.splice(startIndex, this._paginator.pageSize)
    })
  }

  disconnect () {}
}

@Component({
  selector: 'app-patient-table',
  styleUrls: ['patient-table.component.scss'],
  templateUrl: 'patient-table.component.html'
})
export class PatientTableComponent implements OnInit {

  @Input() subjects
  displayedColumns = ['subjectId', 'active', 'startdate', 'enddate', 'sources']
  dataSource: PatientDataSource | null

  @ViewChild(MdPaginator) paginator: MdPaginator

  ngOnInit () {
    this.dataSource = new PatientDataSource(this.subjects, this.paginator)
  }
}
