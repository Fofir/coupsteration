import React, { Component } from 'react';
import { SCOOTER_MODEL_FILTERS, DISPLAY_TYPES } from './constants';

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
    };
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
