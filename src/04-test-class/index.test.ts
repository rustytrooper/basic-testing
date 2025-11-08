import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import { describe, test, expect } from '@jest/globals';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 600;

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(100);
    const transferAmount = 600;

    expect(() => account1.transfer(transferAmount, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    const transferAmount = 100;

    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
    expect(() => account.transfer(transferAmount, account)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const depositAmount = 500;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const withdrawAmount = 300;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 1000;
    const initialBalance2 = 500;
    const transferAmount = 300;

    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const mockBalance = 42;
    (random as jest.Mock)
      .mockReturnValueOnce(mockBalance)
      .mockReturnValueOnce(1);

    const result = await account.fetchBalance();

    expect(result).toBe(mockBalance);
    expect(random).toHaveBeenCalledTimes(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const newBalance = 750;
    const account = getBankAccount(initialBalance);

    (random as jest.Mock)
      .mockReturnValueOnce(newBalance)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
    expect(account.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);

    (random as jest.Mock).mockReturnValueOnce(100).mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
