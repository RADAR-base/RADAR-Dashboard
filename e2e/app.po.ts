import { browser, element, by } from 'protractor/globals';

export class RadarDashboardPage {
  navigateTo() {
    return browser.get('/');
  }

  getDashboard() {
    return element(by.css('app-root app-dashboard'));
  }
}
