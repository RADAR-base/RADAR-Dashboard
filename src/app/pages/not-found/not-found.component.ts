import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Page not found.</p>
    <p><button routerLink="/">Take me home</button></p>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundPageComponent {}
