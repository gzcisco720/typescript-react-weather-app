import { ICurrentState } from "../../store/reducers/current.reducer";
import { IForecastState } from "../../store/reducers/forecast.reducer";
export interface IStore {
    current: ICurrentState
    forecast: IForecastState
}
