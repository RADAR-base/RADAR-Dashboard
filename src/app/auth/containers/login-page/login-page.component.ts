import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromAuth from '../../reducers'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}
}
