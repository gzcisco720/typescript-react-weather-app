import IForecast from './IForecast';

export default interface IGetForecastResponse {
  data: IForecast[];
  city_name: string;
  lon: string;
  timezone: string;
  lat: string;
  country_code: string;
  state_code: string;
}
