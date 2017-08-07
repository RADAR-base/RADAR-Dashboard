import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import * as complianceAction from '../../shared/store/compliance/compliance.actions'

import { ComplianceService } from '../../shared/store/compliance/compliance.service'
import * as fromRoot from '../../shared/store/index'
import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-compliance-plot',
  template: `
    <div *ngIf="isComplianceLoaded$ | async" class="chart">
      <app-chart-base-multi-bar [chartData]="data$ | async"></app-chart-base-multi-bar>
    </div>
  `,
  styleUrls: ['./compliance-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePlotComponent implements OnInit {

  @Input() studyId
  @Input() timeHoles = true
  data$: Observable<any>
  isComplianceLoaded$: Observable<boolean>

  // TODO: Part of config
  complianceKeys =
    [
      {
        'key': 'simple',
        'doc': 'Simple compliance.',
        'label': {
          'EN': 'Simple Compliance'
        }
      },
      {
        'key': 'special',
        'doc': 'Special Compliance',
        'label': {
          'EN': 'Special Compliance'
        }
      }
    ]

  constructor (
    public service: ComplianceService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    this.isComplianceLoaded$ = this.store.select(fromRoot.getComplianceIsLoaded)

    this.store.dispatch(new complianceAction.GetAll({
      studyId: this.studyId,
      keys: this.complianceKeys,
      timeHoles: this.timeHoles
    }))

    this.data$ = this.store.select(fromRoot.getComplianceAll)
      .publishReplay().refCount()
  }

}
