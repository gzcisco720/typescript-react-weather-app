import IForecast from "../../common/interfaces/IForecast";
import IError from "../../common/interfaces/IError";
import WeatherbitApp from "../../utils/WeatherbitApp";
import IGetForecastResponse from "../../common/interfaces/IGetForecastResponse";

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

export const fetchForecast = (dispatch: React.Dispatch<ForecastActionTypes>) => async (city:string) => {
    dispatch(getForecast());

    try {
        const apiResponse = await WeatherbitApp.get<IGetForecastResponse>('/forecast/daily', {
            params: {
                city
            }
        })
        const { data } = apiResponse;
        const { data: forecastList } = data
    
        if(forecastList && forecastList.length > 0 ) {
            dispatch(getForecastSuccess(forecastList))
        } else {
            alertify.error("City not found")
            dispatch(getForecastFailure({
                code: 404,
                message: "Forecast data not found"
            }))
        }
    } catch (error) {
        dispatch(getForecastFailure({
            code: error,
            message: error.message
        }))
    }
}
