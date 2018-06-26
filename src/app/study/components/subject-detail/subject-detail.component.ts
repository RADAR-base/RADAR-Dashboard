import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Subject } from '../../../shared/models/subject.model'

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  @Input() subject: Subject

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSubjectHandler() {
    this.router.navigateByUrl(
      `/study/${this.subject.projectName}/subject/${this.subject.subjectId}`
    )
  }
}
