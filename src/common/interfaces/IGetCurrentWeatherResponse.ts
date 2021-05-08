import { count } from "console"
import ICurrentWather from "./ICurrentWeather";

export default interface IGetCurrentWeatherResponse {
    data: ICurrentWather[];
    count: number;
}