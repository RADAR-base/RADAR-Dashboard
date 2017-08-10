import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'
import * as fromRoot from '../../shared/store/index'

@Component({
  selector: 'app-overview-page',
  template: `
    <app-toolbar>
      <div start>
        <img class="logo" src="assets/radar-logo.svg" alt="RADAR-CNS Logo">
        <div class="title">
          <div class="font-body-light">RADAR-CNS</div>
          <div class="font-title">Mental Health</div>
        </div>
      </div>
      <div end>
        <button md-icon-button>
          <i class="material-icons">more_vert</i>
        </button>
      </div>
    </app-toolbar>
    <div class="content">
      <div *ngFor="let study of (studies$ | async)">
        <p>
          <button [routerLink]="['study', study.id]" md-raised-button>
            {{ study.name }} - {{ study.id }}
          </button>
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {
  studies$: Observable<Study[]>

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new studyAction.GetAll())
    this.studies$ = this.store.select(fromRoot.getStudyAll)
  }
}
