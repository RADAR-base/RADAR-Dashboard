import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-study-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Study Page</div>
  `,
  styleUrls: ['./study.component.scss']
})
export class StudyPageComponent implements OnInit {
  constructor () {}
  ngOnInit () {}
}
