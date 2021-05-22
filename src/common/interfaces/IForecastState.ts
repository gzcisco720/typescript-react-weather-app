import IError from "./IError";
import IForecast from "./IForecast";

export interface IForecastState {
  loading: boolean;
  data: IForecast[];
  error: IError | null;
}
