import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../common/interfaces/IStore';
import fetchCurrentWeather from '../../store/thunk/current.thunk';
import fetchForecast from '../../store/thunk/forecast.thunk';
import App from './App';

const mapDispatchToProps = (dispatch: ThunkDispatch<IStore, {}, AnyAction>) => {
    return {
        fetchCurrent: (city:string) => dispatch(fetchCurrentWeather(city)),
        fetchForecast: (city:string) => dispatch(fetchForecast(city))
    };
};

export default connect(null, mapDispatchToProps)(App);
