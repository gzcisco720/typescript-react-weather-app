import IForecast from "../../common/interfaces/IForecast";
import IError from "../../common/interfaces/IError";

export const GET_FORECAST = 'GET_FORECAST';
export const GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS';
export const GET_FORECAST_FAILURE = 'GET_FORECAST_FAILURE';

export interface IGetForecastAction {
    type: typeof GET_FORECAST;
}

export interface IGetForecastSuccessAction {
    type: typeof GET_FORECAST_SUCCESS;
    payload: IForecast[];
}

export interface IGetForecastFailureAction {
    type: typeof GET_FORECAST_FAILURE;
    payload: IError;
}

export const getForecast = (): IGetForecastAction => ({
    type: GET_FORECAST
});

export const getForecastSuccess = (forecast: IForecast[]): IGetForecastSuccessAction => ({
    type: GET_FORECAST_SUCCESS,
    payload: forecast
});

export const getForecastFailure = (error: IError): IGetForecastFailureAction => ({
    type: GET_FORECAST_FAILURE,
    payload: error
});

export type ForecastActionTypes = IGetForecastAction | IGetForecastSuccessAction | IGetForecastFailureAction;
