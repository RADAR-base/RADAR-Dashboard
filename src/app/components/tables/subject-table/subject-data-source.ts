import { DataSource } from '@angular/cdk'
import { MdPaginator } from '@angular/material'
import { Observable } from 'rxjs/Observable'

import { Subject } from '../../../shared/store/subject/subject.model'
import { SubjectDB } from './subject-db'

export class SubjectDataSource extends DataSource<any> {
  constructor(private subjectDB: SubjectDB, private paginator: MdPaginator) {
    super()
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subject[]> {
    const displayDataChanges = [this.subjectDB.dataChange, this.paginator.page]

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.subjectDB.data.slice()

      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize
      return data.splice(startIndex, this.paginator.pageSize)
    })
  }

  disconnect() {
    this.subjectDB.dataChange.unsubscribe()
  }
}
