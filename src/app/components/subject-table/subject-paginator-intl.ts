import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class SubjectPaginatorIntl {
  changes: Subject<void> = new Subject<void>()

  itemsPerPageLabel = 'Subjects per page:'
  nextPageLabel = 'Next page'
  previousPageLabel = 'Previous page'

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length} Subjects`
    }

    length = Math.max(length, 0)

    const startIndex = page * pageSize

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize

    return `${startIndex + 1} - ${endIndex} of ${length} Subjects`
  }
}
