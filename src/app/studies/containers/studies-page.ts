import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Study } from '../../shared/models/study.model'
import * as studyAction from '../store/studies.actions'
import * as fromStudies from '../store/studies.reducer'

@Component({
  selector: 'app-studies-page',
  templateUrl: './studies-page.html',
  styleUrls: ['./studies-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudiesPageComponent implements OnInit {
  studies$: Observable<Study[]>
  studiesIsLoaded$: Observable<boolean>

  constructor(
    private store: Store<fromStudies.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(new studyAction.Load())
    this.studies$ = this.store.select(fromStudies.getStudies)
    this.studiesIsLoaded$ = this.store.select(fromStudies.getStudiesIsLoaded)
  }

  openStudy(studyName) {
    this.router.navigate(['study', studyName])
  }
}
