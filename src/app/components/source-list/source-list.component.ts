import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-source-list',
  template: `
    <div>SOURCE LIST</div>
  `,
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent implements OnInit {

  constructor () {
    // inject service for sources
  }

  ngOnInit () {
    // load data for sources
  }

}
