import IWeather from './IWeather';

export default interface ICurrentWeather {
  wind_cdir: string;
  rh: number;
  pod: string;
  lon: number;
  pres: number;
  timezone: string;
  ob_time: string;
  country_code: string;
  clouds: number;
  vis: number;
  wind_spd: number;
  wind_cdir_full: string;
  app_temp: number;
  state_code: string;
  ts: number;
  h_angle: number;
  dewpt: number;
  weather: IWeather;
  uv: number;
  aqi: number;
  station: string;
  wind_dir: number;
  elev_angle: number;
  datetime: string;
  precip: number;
  ghi: number;
  dni: number;
  dhi: number;
  solar_rad: number;
  city_name: string;
  sunrise: string;
  sunset: string;
  temp: number;
  lat: number;
  slp: number;
}
