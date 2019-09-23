import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromStudy from '../../../store'
import * as complianceDataActions from '../../store/compliance-data/compliance-data.actions'

@Component({
  selector: 'app-compliance-toggle',
  template: `
    <div class="toggle-stat">
      <mat-select value="30 days">
        <mat-option value="30 days" (click)="onSelect(selectedTime)"
          >30 days</mat-option
        >
      </mat-select>
    </div>
  `,
  styleUrls: ['./compliance-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplianceToggleComponent {
  @Input() selectedTime = '30 days'

  constructor(private store: Store<fromStudy.State>) {}

  onSelect(time) {
    this.selectedTime = time
    this.store.dispatch(
      new complianceDataActions.SetTimeFrame(this.selectedTime)
    )
  }
}
