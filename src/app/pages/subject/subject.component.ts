import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-patient-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-dashboard-grid></app-dashboard-grid>
  `,
  styleUrls: ['./subject.component.scss']
})
export class SubjectPageComponent implements OnDestroy {

  private route$: any

  constructor (private route: ActivatedRoute) {
    this.route$ = route.params
      .subscribe(console.log)
  }

  ngOnDestroy () {
    this.route$.unsubscribe()
  }
}
