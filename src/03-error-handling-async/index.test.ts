import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
import { describe, test, expect } from '@jest/globals';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValues = [
      'test string',
      42,
      { key: 'value' },
      [1, 2, 3],
      null,
      undefined,
    ];
    for (const value of testValues) {
      await expect(resolveValue(value)).resolves.toBe(value);
    }
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const customMessage = 'Custom error message';
    expect(() => throwError(customMessage)).toThrow(customMessage);
    expect(() => throwError(customMessage)).toThrow(Error);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
    expect(() => throwError(undefined)).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
