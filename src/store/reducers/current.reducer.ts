import ICurrentWeather from '../../common/interfaces/ICurrentWeather';
import IError from '../../common/interfaces/IError';
import {
    GET_CURRENT_WEATHER, 
    GET_CURRENT_WEATHER_SUCCESS, 
    GET_CURRENT_WEATHER_FAILURE,
    CurrentWeatherActionTypes
} from '../actions/current.action';

export interface ICurrentState {
    loading: boolean;
    data: ICurrentWeather | null;
    error: IError | null;
}

const initalState: ICurrentState = {
    loading: false,
    data: null,
    error: null
}

const reducer = (state = initalState, action: CurrentWeatherActionTypes) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER:
            return { ...state, ...{ loading: true, data: null, error: null } };
        case GET_CURRENT_WEATHER_SUCCESS:
            return { ...state, ...{ loading: false, data: action.payload, error: null } };
        case GET_CURRENT_WEATHER_FAILURE:
            return { ...state, ...{ loading: false, data: null, error: action.payload } };
        default:
            return state;
    }
}

export default reducer;
