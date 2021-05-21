import { ICurrentState } from "./ICurrentState";
import { IForecastState } from "./IForecastState";

export interface IStore {
    current: ICurrentState
    forecast: IForecastState
}
