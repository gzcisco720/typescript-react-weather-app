import { ThunkDispatch } from "redux-thunk";
import IGetCurrentWeatherResponse from "../../common/interfaces/IGetCurrentWeatherResponse";
import { IStore } from "../../common/interfaces/IStore";
import WeatherbitApp from "../../utils/WeatherbitApp";
import { CurrentWeatherActionTypes, getCurrentWeather, getCurrentWeatherFailure, getCurrentWeatherSuccess } from "../actions/current.action";

const fetchCurrentWeather = (city: string) => {
    return (dispatch: ThunkDispatch<IStore, {}, CurrentWeatherActionTypes>) => {
        dispatch(getCurrentWeather());

        return WeatherbitApp.get<IGetCurrentWeatherResponse>('/current', {
            params: {
                city
            }
        }).then(
            res => {
                const { data } = res;
                const { data: weatherList } = data

                if(weatherList && weatherList.length > 0 ) {
                    dispatch(getCurrentWeatherSuccess(weatherList[0]))
                } else {
                    dispatch(getCurrentWeatherFailure({
                        code: 404,
                        message: "Weather data not found"
                    }))
                }
            },
            error => {
                dispatch(getCurrentWeatherFailure({
                    code: error.response.status,
                    message: error.message
                }))
            }
        )
    }
}

export default fetchCurrentWeather;
