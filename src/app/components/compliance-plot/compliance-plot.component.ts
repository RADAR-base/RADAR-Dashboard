import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

// import { CompliancePlotService } from './compliance-plot.service'
import { Store } from '@ngrx/store'

import { ComplianceService } from '../../shared/store/compliance/compliance.service'
import * as fromRoot from '../../shared/store/index'
import * as complianceAction from '../../shared/store/compliance/compliance.actions'

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
  data$: Observable<any>
  isComplianceLoaded$: Observable<any>

  // constructor (public complianceDataService: CompliancePlotService) {}
  constructor (
    public service: ComplianceService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    // this.data$ = this.complianceDataService.getAll()
    this.isComplianceLoaded$ = this.store.select(fromRoot.getComplianceIsLoaded)
    this.store.dispatch(new complianceAction.GetAll(this.studyId))
    this.data$ = this.store.select(fromRoot.getComplianceAll)
        .publishReplay().refCount()
  }

}
