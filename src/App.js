import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import reduce from 'lodash/reduce';
import { SCOOTER_MODELS, SCOOTER_MODEL_FILTERS, DISPLAY_TYPES } from './constants';
import ScootersApi from './ScootersApi';
import ScootersTable from './ScootersTable';
import Select from './Select';

const scooterModelOptions = [
  { label: 'All', value: SCOOTER_MODEL_FILTERS.ALL },
  { label: SCOOTER_MODELS.GOGORO_V1, value: SCOOTER_MODEL_FILTERS.GOGORO_V1 },
  { label: SCOOTER_MODELS.GOGORO_V2, value: SCOOTER_MODEL_FILTERS.GOGORO_V2 },
];

export const filterScootersByModel = (scooters, model) => {
  if (model === SCOOTER_MODEL_FILTERS.ALL) {
    return Object.keys(scooters);
  }
  return reduce(scooters, (agg, scooter, id) => {
    return scooter.model === model ? [...agg, id] : agg;
  }, []);
};

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
    const { scooters } = this.state;

    this.setState({
      scooterModelFilter,
      scooterIds: filterScootersByModel(scooters, scooterModelFilter),
    });
  }

  render() {
    const {
      scooterIds,
      scooters,
      isInitialAppStateLoaded,
      scooterModelFilter,
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
                onChange={this.changeScooterFilter}
                disabled={!isInitialAppStateLoaded}
                options={scooterModelOptions}
                value={scooterModelFilter}
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
