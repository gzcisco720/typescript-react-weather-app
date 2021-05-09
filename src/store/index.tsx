import { createContext, Dispatch, Reducer, useContext, useReducer } from "react"
import { IStore } from "../common/interfaces/IStore"
import currentReducer, { initalCurrentState } from "./reducers/current.reducer"
import forecastReducer, { initalForecastState } from "./reducers/forecast.reducer"
import combineReducers from "combine-reducers";
import { CurrentWeatherActionTypes } from "./actions/current.action";
import { ForecastActionTypes } from "./actions/forecast.action";

const initalStoreState: IStore = {
  current: initalCurrentState,
  forecast: initalForecastState
}

const reducers: Reducer<IStore, ForecastActionTypes|CurrentWeatherActionTypes> = combineReducers({
  current: currentReducer,
  forecast: forecastReducer
});

const StoreContext = createContext<IStore>(initalStoreState);
const DispatchContext = createContext<Dispatch<ForecastActionTypes|CurrentWeatherActionTypes>>(()=>{});

export const StoreProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducers, initalStoreState);
  const {children} = props;
  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>
        {children}
      </StoreContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
