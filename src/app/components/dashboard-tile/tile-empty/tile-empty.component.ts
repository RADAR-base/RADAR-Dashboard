import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-tile-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
    </div>
    <div class="container"></div>
  `,
  styleUrls: ['./tile-empty.component.scss']
})
export class TileEmptyComponent {

  @Input() title: string

}
