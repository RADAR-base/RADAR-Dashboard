import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-tile',
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
      <ng-content select="[header-content]"></ng-content>
    </div>
    <div class="container">
      <ng-content select="[tile-content]"></ng-content>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {

  @Input() title: string

}
