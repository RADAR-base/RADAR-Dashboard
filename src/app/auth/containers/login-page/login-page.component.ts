import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as bcrypt from 'bcryptjs'

import { ENV } from '../../../../environments/environment'
import { UserAuth } from '../../models/auth'
import * as AuthActions from '../../store/auth.actions'
import * as fromAuth from '../../store/auth.reducer'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFailed = false
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  loginHandler(event: UserAuth) {
    if (
      bcrypt.compareSync(event.password, ENV.PASS) &&
      event.username === ENV.USER
    ) {
      this.store.dispatch(new AuthActions.Login(event))
    } else {
      this.loginFailed = true
    }
  }
}
