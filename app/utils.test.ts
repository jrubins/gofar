import { calculatePointsFromAge } from './utils'

test.each([
  [65, 0],
  [70, 2],
  [74, 2],
  [75, 5],
  [77, 5],
  [79, 5],
  [80, 6],
  [83, 6],
  [84, 6],
  [85, 11],
  [88, 11],
])('calculates points from age: %i => %i', (age, expected) => {
  expect(calculatePointsFromAge(age)).toBe(expected)
})
