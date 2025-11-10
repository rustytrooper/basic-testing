// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = '/users/1';
  const mockResponse = { data: 'test data' };
  let getFromAxios: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    getFromAxios = jest.fn().mockResolvedValue({ data: mockResponse });
    (axios.create as jest.Mock).mockReturnValue({ get: getFromAxios });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(getFromAxios).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const dataReceived = await throttledGetDataFromApi(relativePath);

    expect(dataReceived).toEqual(mockResponse);
  });
});
