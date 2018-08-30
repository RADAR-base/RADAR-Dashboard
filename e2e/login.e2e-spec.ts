import { browser, by, element } from 'protractor'

import { LoginPage } from './login.po'

describe('radar-dashboard Login', function() {
  let page: LoginPage

  beforeEach(() => {
    page = new LoginPage()
  })

  const credentials = { username: 'user', password: 'pass' }

  it('when login is successful — he should redirect to studies page', () => {
    page.navigateTo()
    page.fillCredentials()

    browser.waitForAngular()

    const list = element.all(by.css('.study-card'))
    expect(list.count()).toBeGreaterThan(0)
  })
})
