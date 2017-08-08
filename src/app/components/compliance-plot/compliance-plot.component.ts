import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
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

  constructor(
    public service: ComplianceService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isComplianceLoaded$ = this.store.select(fromRoot.getComplianceIsLoaded)

    this.store.dispatch(
      new complianceAction.GetAll({
        studyId: this.studyId,
        keys: AppConfig.config.compliance.keys,
        timeHoles: this.timeHoles
      })
    )

    this.data$ = this.store
      .select(fromRoot.getComplianceAll)
      .publishReplay()
      .refCount()
  }
}
