import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-tile',
  template: `
    <div class="tile-header">
      <div class="tile-label">{{ label }}</div>
      <ng-content select="[header-content]"></ng-content>
    </div>
    <div class="tile-container">
      <ng-content select="[tile-content]"></ng-content>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() label: string
}
