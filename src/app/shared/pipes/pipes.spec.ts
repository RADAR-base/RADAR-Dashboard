import { DateCalcPipe } from './pipes'

describe('Pipe: DateCalcPipe', () => {
  let pipe: DateCalcPipe
  const testDate = new Date('2018-04-18')
  const expectedDateBackward = new Date('2018-04-17')
  const expectedDateForward = new Date('2018-04-19')

  beforeEach(() => {
    pipe = new DateCalcPipe()
  })

  it('should return correct date transformation: backward', () => {
    expect(pipe.transform(testDate, 'ONE_DAY', 'backward').getTime()).toBe(
      expectedDateBackward.getTime()
    )
  })

  it('should return correct date transformation: forward', () => {
    expect(pipe.transform(testDate, 'ONE_DAY', 'forward').getTime()).toBe(
      expectedDateForward.getTime()
    )
  })
})
