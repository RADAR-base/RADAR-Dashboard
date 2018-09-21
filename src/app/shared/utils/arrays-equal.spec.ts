import { arraysEqual } from './arrays-equal'

describe('arraysEqual', () => {
  const arrayA = []
  const arrayB = ['A']
  const arrayC = ['A']
  const arrayD = ['B']

  it('The same arrays should be equal', () => {
    const result = arraysEqual(arrayB, arrayC)
    expect(result).toBeTruthy()
  })

  it('Different array lengths should not be equal', () => {
    const result = arraysEqual(arrayA, arrayB)
    expect(result).toBeFalsy()
  })

  it('Arrays with different elements should not be equal', () => {
    const result = arraysEqual(arrayB, arrayD)
    expect(result).toBeFalsy()
  })
})
