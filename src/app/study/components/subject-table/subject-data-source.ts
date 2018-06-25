import { DataSource } from '@angular/cdk/table'
import { MatPaginator } from '@angular/material'
import { Observable, merge } from 'rxjs'
import { map } from 'rxjs/operators'

import { Subject } from '../../../shared/models/subject.model'
import { SubjectDB } from './subject-db'

export class SubjectDataSource extends DataSource<any> {
  constructor(private subjectDB: SubjectDB, private paginator: MatPaginator) {
    super()
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Subject[]> {
    const displayDataChanges = [this.subjectDB.dataChange, this.paginator.page]

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = this.subjectDB.data.slice()

        // Grab the page's slice of data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize
        return data.splice(startIndex, this.paginator.pageSize)
      })
    )
  }

  disconnect() {
    this.subjectDB.dataChange.unsubscribe()
  }
}
