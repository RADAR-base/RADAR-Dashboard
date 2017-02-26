import { RadarDashboardPage } from './app.po'

describe('radar-dashboard App', function () {
  let page: RadarDashboardPage

  beforeEach(() => {
    page = new RadarDashboardPage()
  })

  it('should have the DashboardGridComponent', () => {
    page.navigateTo()
    expect(page.getDashboard()).toBeTruthy()
  })
})
