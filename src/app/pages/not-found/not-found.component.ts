import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Page not found.</div>
    <button routerLink="/">Take me home</button>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundPageComponent {}
