import { Params, RouterStateSnapshot } from '@angular/router'
import { RouterStateSerializer } from '@ngrx/router-store'

export interface CustomRouterState {
  url: string
  params: Params
  queryParams: Params
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<CustomRouterState> {
  serialize(routerState: RouterStateSnapshot): CustomRouterState {
    let route = routerState.root

    while (route.firstChild) {
      route = route.firstChild
    }

    const {
      url,
      root: { queryParams }
    } = routerState
    const { params } = route

    return { url, params, queryParams }
  }
}
