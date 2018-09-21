import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Study } from '../../shared/models/study.model'
import * as studyActions from '../store/studies.actions'
import * as fromStudies from '../store/studies.reducer'

@Component({
  selector: 'app-studies-page',
  templateUrl: './studies-page.component.html',
  styleUrls: ['./studies-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudiesPageComponent implements OnInit, OnDestroy {
  studies$: Observable<Study[]>
  studiesIsLoaded$: Observable<boolean>

  constructor(
    private store: Store<fromStudies.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(new studyActions.Load())
    this.studies$ = this.store.select(fromStudies.getStudies)
    this.studiesIsLoaded$ = this.store.select(fromStudies.getStudiesIsLoaded)
  }

  ngOnDestroy() {
    this.store.dispatch(new studyActions.Destroy())
  }

  openStudy(studyName) {
    this.router.navigate(['study', studyName])
  }
}
