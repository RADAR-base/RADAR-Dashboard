import { browser, by, element } from 'protractor'

export class LoginPage {
  private credentials = { username: 'user', password: 'pass' }
  navigateTo() {
    return browser.get('/login')
  }

  fillCredentials(credentials: any = this.credentials) {
    element(by.css('[formControlName="username"]')).sendKeys(
      credentials.username
    )
    element(by.css('[formControlName="password"]')).sendKeys(
      credentials.password
    )
    element(by.css('button')).click()
  }

  getPage(page) {
    return element(by.css(`app-root`))
  }
}
