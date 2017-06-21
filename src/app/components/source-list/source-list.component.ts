import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-list',
  template: `
    <div *ngFor="let source of sources">
      <p>{{source.id}} | {{source.type}}</p>
    </div>
  `,
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent {

  @Input() sources

}
