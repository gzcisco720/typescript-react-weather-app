import ICurrentWeather from "../../common/interfaces/ICurrentWeather";
import IError from "../../common/interfaces/IError";

export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';
export const GET_CURRENT_WEATHER_SUCCESS = 'GET_CURRENT_WEATHER_SUCCESS';
export const GET_CURRENT_WEATHER_FAILURE = 'GET_CURRENT_WEATHER_FAILURE';

export interface IGetCurrentWeatherAction {
    type: typeof GET_CURRENT_WEATHER;
}

export interface IGetCurrentWeatherSuccessAction {
    type: typeof GET_CURRENT_WEATHER_SUCCESS;
    payload: ICurrentWeather;
}

export interface IGetCurrentWeatherFailureAction {
    type: typeof GET_CURRENT_WEATHER_FAILURE;
    payload: IError;
}

export const getCurrentWeather = (): IGetCurrentWeatherAction => ({
    type: GET_CURRENT_WEATHER
});

export const getCurrentWeatherSuccess = (current: ICurrentWeather): IGetCurrentWeatherSuccessAction => ({
    type: GET_CURRENT_WEATHER_SUCCESS,
    payload: current
});

export const getCurrentWeatherFailure = (error: IError): IGetCurrentWeatherFailureAction => ({
    type: GET_CURRENT_WEATHER_FAILURE,
    payload: error
});

export type CurrentWeatherActionTypes = IGetCurrentWeatherAction | IGetCurrentWeatherSuccessAction | IGetCurrentWeatherFailureAction;
