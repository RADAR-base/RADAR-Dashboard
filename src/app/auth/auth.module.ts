import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { MaterialModule } from '../material'
import { routes } from './auth.routing'
import { LoginFormComponent } from './component/login-form/login-form.component'
import { LoginPageComponent } from './containers/login-page/login-page.component'
import { AuthGuard } from './services/auth.guard'
import { AuthService } from './services/auth.service'
import { AuthEffects } from './store/auth.effects'
import * as fromAuth from './store/auth.reducer'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', fromAuth.reducer)
  ],
  declarations: [LoginPageComponent, LoginFormComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard]
    }
  }
}
