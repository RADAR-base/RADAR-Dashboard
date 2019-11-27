import { browser, by, element } from 'protractor'

export class LoginPage {
  navigateTo() {
    return browser.get('/login')
  }

  clickButton() {
    element(by.css('button')).click()
  }

  getPage(page) {
    return element(by.css(`app-root`))
  }
}
