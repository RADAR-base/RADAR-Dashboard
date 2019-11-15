import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { ENV } from '../../../../environments/environment'
import * as AuthActions from '../../store/auth.actions'
import * as fromAuth from '../../store/auth.reducer'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.Login())
  }

  loginHandler() {
    window.location.href = `${ENV.AUTH_URI}/authorize?client_id=${
      ENV.AUTH.client_id
    }&response_type=code&redirect_uri=${window.location.href.split('?')[0]}`
  }
}
