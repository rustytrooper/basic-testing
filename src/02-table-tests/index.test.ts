// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 36, b: 6, action: Action.Divide, expected: 6 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 7, b: 3, action: Action.Exponentiate, expected: 343 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 3, b: 10, action: Action.Multiply, expected: 30 },
  { a: 6, b: 4, action: Action.Multiply, expected: 24 },
  { a: 30, b: 5, action: Action.Subtract, expected: 25 },
  { a: 18, b: 9, action: Action.Subtract, expected: 9 },
  { a: 40, b: 5, action: Action.Subtract, expected: 35 }
];

describe('simpleCalculator', () => {
  test.each(testCases)('the result of $action for $a and $b is $expected', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected)
  })
});
