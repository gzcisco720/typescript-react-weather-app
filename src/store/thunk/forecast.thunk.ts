import { ThunkDispatch } from "redux-thunk";
import IGetForecastResponse from "../../common/interfaces/IGetForecastResponse";
import { IStore } from "../../common/interfaces/IStore";
import WeatherbitApp from "../../utils/WeatherbitApp";
import { ForecastActionTypes, getForecast, getForecastSuccess, getForecastFailure } from "../actions/forecast.action";

const fetchForecast = (city: string) => {
    return (dispatch: ThunkDispatch<IStore, {}, ForecastActionTypes>) => {
        dispatch(getForecast());

        return WeatherbitApp.get<IGetForecastResponse>('/forecast/daily', {
            params: {
                city
            }
        }).then(
            res => {
                const { data } = res;
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
            },
            error => {
                dispatch(getForecastFailure({
                    code: error.response.status,
                    message: error.message
                }))
            }
        )
    }
}

export default fetchForecast;
