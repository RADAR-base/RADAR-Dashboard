import { browser, by, element } from 'protractor'

export class RadarDashboardPage {
  navigateTo () {
    return browser.get('/')
  }

  getDashboard () {
    return element(by.css('app-root app-dashboard'))
  }
}
