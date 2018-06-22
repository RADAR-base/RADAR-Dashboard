import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'

import { AppConfig } from '../../../shared/utils/config'
import * as fromSubjectPage from '../../store'
import * as sourcesActions from '../../store/sources/sources.actions'

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent implements OnInit {
  language = AppConfig.language
  collapsed = []

  @Input() sources

  constructor(private store: Store<fromSubjectPage.State>) {}

  ngOnInit() {}

  toggleSourceData(sourceDataUid, sourceId) {
    const payload = { sourceDataUid, sourceId }
    this.store.dispatch(new sourcesActions.ToggleVisibility(payload))
  }
}
