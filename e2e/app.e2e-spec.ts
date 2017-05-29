import { RadarPagesTest } from './app.po'

describe('radar-dashboard App', function () {
  let page: RadarPagesTest

  beforeEach(() => {
    page = new RadarPagesTest()
  })

  it('should load the Overview Page', () => {
    page.navigateTo('/')
    expect(page.getPage('overview')).toBeTruthy()
  })

  it('should load the NotFound Page', () => {
    page.navigateTo('/qwertyuiop')
    expect(page.getPage('not-found')).toBeTruthy()
  })

  it('should load the Study Page', () => {
    page.navigateTo('/study/0')
    expect(page.getPage('study')).toBeTruthy()
  })

  it('should load the Subject Page', () => {
    page.navigateTo('/study/0/subject/0')
    expect(page.getPage('subject')).toBeTruthy()
  })
})
