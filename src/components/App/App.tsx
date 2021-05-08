import * as React from 'react';
import './App.scss';
import Current from '../Current';
import Forecast from '../Forecast';
import { debounce } from 'lodash';

interface IPorps {
  fetchCurrent: Function;
  fetchForecast: Function;
}

interface IState {
  searchCity: string;
}

class App extends React.Component<IPorps, IState> {
  
  constructor(props: IPorps) {
    super(props);
    this.state = {
      searchCity: ''
    }
  }

  private search = debounce((serachText: string) => {
    const {fetchCurrent, fetchForecast} = this.props;
    let searchCity = serachText ? serachText : "Melbourne,AU";
    fetchCurrent(searchCity);
    fetchForecast(searchCity);
  }, 1000)

  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCity = event.currentTarget.value;
    this.setState({ searchCity });
    this.search(searchCity)
  }

  public componentDidMount = () => {
    const {fetchCurrent, fetchForecast} = this.props;
    fetchCurrent('Melbourne,AU');
    fetchForecast('Melbourne,AU');
  }

  public render = ()=> {
    const {searchCity} = this.state;
    return (
      <div className="App">
        <div className="App__Search">
          <div className="form-group">
            <input type="text" 
              className="form-control" 
              id="searchCity"
              value={searchCity}
              onChange={this.handleSearchChange}
              placeholder="search, for example 'Melbourne,AU'" />
          </div>
        </div>
        <div className="App__WeatherWrapper">
          <div className="App__WeatherCurrent">
            <Current />
          </div>
          <div className="App__WeatherForecast">
            <Forecast />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
