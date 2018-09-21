import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { UserAuth } from '../../models/auth'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<UserAuth>()

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get formUsername() {
    return this.form.get('username')
  }
  get formPassword() {
    return this.form.get('password')
  }

  loginHandler() {
    if (this.form.valid) {
      this.login.emit(this.form.value)
    }
  }
}
