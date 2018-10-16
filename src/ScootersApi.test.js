import axios from 'axios';
import ScootersApi from './ScootersApi';
import apiMockResponse from './apiMock.json';

jest.mock('axios');
axios.get.mockReturnValue(Promise.resolve({ data: apiMockResponse }));

describe('ScootersApi', () => {
  it('gets a list of scooters from the API endpoint /scooters', async () => {
    const result = await ScootersApi.all();
    expect(result).toHaveProperty('meta');
    expect(result).toHaveProperty('data');
  });
});
