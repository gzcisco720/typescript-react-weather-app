import ICurrentWeather from "./ICurrentWeather";
import IError from "./IError";

export interface ICurrentState {
  loading: boolean;
  data: ICurrentWeather | null;
  error: IError | null;
}
