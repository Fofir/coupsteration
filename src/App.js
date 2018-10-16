import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import { SCOOTER_MODELS, SCOOTER_MODEL_FILTERS, DISPLAY_TYPES } from './constants';
import ScootersApi from './ScootersApi';
import ScootersTable from './ScootersTable';
import Select from './Select';

const scooterModelOptions = [
  { label: 'All', value: SCOOTER_MODEL_FILTERS.ALL },
  { label: SCOOTER_MODELS.GOGORO_V1, value: SCOOTER_MODEL_FILTERS.GOGORO_V1 },
  { label: SCOOTER_MODELS.GOGORO_V2, value: SCOOTER_MODEL_FILTERS.GOGORO_V2 },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scooters: {},
      scooterIds: [],
      isInitialAppStateLoaded: false,
      areScootersLoaded: false,
      scooterModelFilter: SCOOTER_MODEL_FILTERS.ALL,
      displayType: DISPLAY_TYPES.TABLE,
      hasScooterLoadingError: false,
    };
  }

  componentWillMount() {
    this.fetchScooters();
  }

  fetchScooters = () => {
    this.setState({
      areScootersLoaded: false,
      hasScooterLoadingError: false,
    });

    return ScootersApi.all()
      .then(({ meta, data }) => {
        this.setState({
          scooters: keyBy(data.scooters, 'id'),
          scooterIds: data.scooters.map(scooter => scooter.id),
          areScootersLoaded: true,
          isInitialAppStateLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({
          isInitialAppStateLoaded: true,
          areScootersLoaded: true,
          scooterLoadingError: true,
        });
      })
  }

  changeDisplayType = (displayType) => {
    this.setState({ displayType });
  }

  changeScooterFilter = (scooterModelFilter) => {
    this.setState({
      scooterModelFilter,
    });
  }

  render() {
    const {
      scooterIds,
      scooters,
      isInitialAppStateLoaded,
    } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Coupsteration</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Select
                disabled={!isInitialAppStateLoaded}
                options={scooterModelOptions}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ScootersTable scooters={scooterIds.map(id => scooters[id])} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
