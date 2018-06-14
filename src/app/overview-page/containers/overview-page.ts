import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Study } from '../../shared/models/study.model'
import * as fromOverview from '../store/index'
import * as studyAction from '../store/studies/studies.actions'

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.html',
  styleUrls: ['./overview-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {
  studies$: Observable<Study[]>
  studiesIsLoaded$: Observable<boolean>

  constructor(private store: Store<fromOverview.State>) {}

  ngOnInit() {
    this.store.dispatch(new studyAction.Load())
    this.studies$ = this.store.select(fromOverview.getStudies)
    this.studiesIsLoaded$ = this.store.select(fromOverview.getStudiesIsLoaded)
  }
}
