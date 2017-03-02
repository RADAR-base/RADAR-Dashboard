/* tslint:disable */
// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router'
import { Component, Directive, HostListener, Injectable, Input } from '@angular/core'
import { NavigationExtras } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @HostListener('click') onClick
  @Input('routerLink') linkParams: any
  navigatedTo: any = null

  onClick () {
    this.navigatedTo = this.linkParams
  }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {}

@Injectable()
export class RouterStub {
  navigate (commands: any[], extras?: NavigationExtras) { }
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams)
  params = this.subject.asObservable()

  // Test parameters
  private _testParams: {}
  get testParams () { return this._testParams }

  set testParams (params: {}) {
    this._testParams = params
    this.subject.next(params)
  }

  // ActivatedRoute.snapshot.params
  get snapshot () {
    return { params: this.testParams }
  }
}

/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
