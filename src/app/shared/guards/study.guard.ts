import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class StudyGuard implements CanActivate {

  constructor (private router: Router) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: replace with guard check
    const r = true
    if (r) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
