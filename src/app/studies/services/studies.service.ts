import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ENV } from '../../../environments/environment'
import { User } from '../../auth/models/user'
import { Study } from '../../shared/models/study.model'

@Injectable()
export class StudiesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Study[]>(`${ENV.API_URI}/projects`)
  }

  getAllAssignedToUser(user: User) {
    return this.http.get<Study[]>(
      `https://${ENV.API_DOMAIN}/managementportal/api/users/${user.username}/projects`
    )
  }
}
