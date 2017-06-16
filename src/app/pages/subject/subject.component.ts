import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-patient-page',
  template: `
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
  `,
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectPageComponent implements OnInit, OnDestroy {

  private route$: Subscription

  constructor (
    private route: ActivatedRoute
  ) {}

  ngOnInit () {
    this.route$ = this.route.params
      .subscribe(params => console.log(params))

    console.log(AppConfig.config)
  }

  ngOnDestroy () {
    this.route$.unsubscribe()
  }
}
