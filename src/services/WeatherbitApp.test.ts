import { initRequestHeader } from './WeatherbitApp';

describe('WeatherbitApp', () => {
  it('should return correct config value', () => {
    process.env.REACT_APP_API_KEY = 'abc';
    const config = initRequestHeader({
      baseURL: '',
      params: {
        key: '',
      },
    });
    expect(config.baseURL).toEqual('https://api.weatherbit.io/v2.0');
    expect(config.params.key).toEqual('abc');
  });
});
