import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import reduce from 'lodash/reduce';
import Emoji from 'react-emoji-render';
import {
  CONSTANT_POLLING_INTERVAL,
  SCOOTER_MODELS,
  SCOOTER_MODEL_FILTERS,
  DISPLAY_TYPES,
} from './constants';
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

    this.interval = null;
  }

  componentWillMount() {
    this.fetchScooters();

    window.setInterval(() => {
      this.fetchScooters();
    }, CONSTANT_POLLING_INTERVAL);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  fetchScooters = () => {
    this.setState({
      areScootersLoaded: false,
      hasScooterLoadingError: false,
    });

    return ScootersApi.all()
      .then(({ meta, data }) => {
        const { scooterModelFilter } = this.state;
        const scooters = keyBy(data.scooters, 'id');
        this.setState({
          scooters,
          scooterIds: filterScootersByModel(scooters, scooterModelFilter),
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
      areScootersLoaded,
    } = this.state;

    return (
      <div className="App p-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Coupsteration <Emoji text="🛵" /></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label>Model:</label>
                <Select
                  className="form-control"
                  onChange={this.changeScooterFilter}
                  disabled={!isInitialAppStateLoaded}
                  options={scooterModelOptions}
                  value={scooterModelFilter}
                />
              </div>
            </div>
            <div className="col-9 col-9 d-flex align-items-end  justify-content-end pb-2 text-right">
              {!areScootersLoaded && 'loading scooters...'}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ScootersTable className="table table-striped" scooters={scooterIds.map(id => scooters[id])} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
