import { DataSource } from '@angular/cdk'
import { Observable } from 'rxjs/Observable'
import { MdPaginator } from '@angular/material'

import { Subject } from '../../../shared/store/subject/subject.model'

export class SubjectDataSource extends DataSource<any> {
  data: Subject[]

  constructor (private subjects: Observable<Subject[]>, private paginator: MdPaginator) {
    super()
    this.subjects.subscribe(x => this.data = x)
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect (): Observable<Subject[]> {
    const displayDataChanges = [
      this.subjects,
      this.paginator.page
    ]

    return Observable.merge(...displayDataChanges).map(() => {
      const pageData = this.data.slice()

      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize
      return pageData.splice(startIndex, this.paginator.pageSize)
    })
  }

  disconnect () {}
}
