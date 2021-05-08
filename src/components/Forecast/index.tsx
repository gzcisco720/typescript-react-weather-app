import Forecast from "./Forecast";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IStore } from "../../common/interfaces/IStore";
import { IForecastState } from "../../store/reducers/forecast.reducer";

const getCurrentSelector = createSelector(
    (state: IStore) => state.forecast,
    (forecast: IForecastState) => forecast,
);

const mapStateToProps = (state: IStore) => {
    return {
        forecastState: getCurrentSelector(state),
    };
};

export default connect(mapStateToProps)(Forecast);
