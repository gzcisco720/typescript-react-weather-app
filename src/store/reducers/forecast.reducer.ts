
import IError from '../../common/interfaces/IError';
import IForecast from '../../common/interfaces/IForecast';
import {
    GET_FORECAST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE,
    ForecastActionTypes
} from '../actions/forecast.action';

export interface IForecastState {
    loading: boolean;
    data: IForecast[];
    error: IError | null;
}

export const initalForecastState: IForecastState = {
    loading: false,
    data: [],
    error: null
}

const reducer = (state = initalForecastState, action: ForecastActionTypes) => {
    switch (action.type) {
        case GET_FORECAST:
            return { ...state, ...{ loading: true, data: [], error: null } };
        case GET_FORECAST_SUCCESS:
            return { ...state, ...{ loading: false, data: action.payload, error: null } };
        case GET_FORECAST_FAILURE:
            return { ...state, ...{ loading: false, data: [], error: action.payload } };
        default:
            return state;
    }
}

export default reducer;
