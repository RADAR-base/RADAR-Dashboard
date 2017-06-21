import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/takeUntil'

import { AppConfig } from '../../shared/utils/config'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

@Component({
  selector: 'app-patient-page',
  template: `
    <app-toolbar>
      <div start>
        <button [routerLink]="['/study', studyId]" md-icon-button>
          <i class="material-icons">arrow_back</i>
        </button>
        <div class="title">Subject {{subjectId}}</div>
      </div>
      <div end>
        <button md-icon-button><i class="material-icons">more_vert</i></button>
      </div>
    </app-toolbar>
    <div class="content">
      <md-grid-list cols="8" rowHeight="fit">
        <md-grid-tile colspan="2">
          <app-tile title="Sources">
            <div class="header-content">
              <div>Item</div>
              <div>Item</div>
              <div>Item</div>
            </div>
            <app-source-list class="tile-content"></app-source-list>
          </app-tile>
        </md-grid-tile>
        <md-grid-tile colspan="6">
          <app-tile title="Graphs">
            <div class="header-content">
              <div>Item</div>
              <div>Item</div>
              <div>Item</div>
            </div>
            <div class="tile-content">SOURCE GRAPHS</div>
          </app-tile>
        </md-grid-tile>
      </md-grid-list>
    </div>
  `,
  styleUrls: ['./subject.component.scss']
})
@TakeUntilDestroy
export class SubjectPageComponent implements OnInit {

  studyId: string
  subjectId: string

  private takeUntilDestroy

  constructor (
    private route: ActivatedRoute
  ) {}

  ngOnInit () {
    this.route.params
      .takeUntil(this.takeUntilDestroy())
      .subscribe(params => {
        this.studyId = params.studyId
        this.subjectId = params.subjectId
        console.log(params)
      })

    console.log(AppConfig.config)
  }

}
