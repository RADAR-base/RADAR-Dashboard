import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { AuthService } from '../../auth/services/auth.service'
import { Study } from '../../shared/models/study.model'

@Injectable()
export class StudiesService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  getAll(): Observable<Study[]> {
    console.log(this.jwtHelper.decodeToken(AuthService.getToken()))

    return this.http.get<any>(`${ENV.API_URI}/projects`).pipe(
      filter(d => d !== null),
      map(res => res.dataset)
    )
  }
}
