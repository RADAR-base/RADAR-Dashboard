import { Subject } from 'rxjs/Subject'

export function TakeUntilDestroy (constructor: any) {
  const ngOnDestroy = constructor.prototype.ngOnDestroy
  let subject = new Subject()

  constructor.prototype.takeUntilDestroy = function () {
    if (subject.closed) {
      subject = new Subject()
    }
    return subject.asObservable()
  }

  constructor.prototype.ngOnDestroy = function (...args) {
    // check if there are observers
    // if not it could mean the developer forgot to add the `takeUntilDestroy` method
    if (!subject.observers.length) {
      console.warn(`${constructor.name} has no observers subscribed. ` +
        `Add '.takeUntil(this.takeUntilDestroy())' to the observers in ${constructor.name}. ` +
        `If you have no observers remove this decorator.`)
    }

    subject.next('ngOnDestroy')
    subject.unsubscribe()

    ngOnDestroy && typeof ngOnDestroy === 'function' && ngOnDestroy.apply(this, args)
  }

  return constructor
}
