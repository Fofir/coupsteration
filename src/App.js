import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import { SCOOTER_MODEL_FILTERS, DISPLAY_TYPES } from './constants';
import ScootersApi from './ScootersApi';

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
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
