import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Subject } from '../../../shared/models/subject.model'

export class SubjectDB {
  dataChange: BehaviorSubject<Subject[]> = new BehaviorSubject([])

  get data(): Subject[] {
    return this.dataChange.value
  }

  set data(value) {
    this.dataChange.next(value)
  }
}
