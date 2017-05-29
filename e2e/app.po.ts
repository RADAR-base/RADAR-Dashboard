import { browser, by, element } from 'protractor'

export class RadarPagesTest {
  navigateTo (route) {
    return browser.get(route)
  }

  getPage (page) {
    return element(by.css(`app-root app-${page}-page`))
  }
}
