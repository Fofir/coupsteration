import React from 'react';
import ReactDOM from 'react-dom';
import App, { filterScootersByModel } from './App';
import { SCOOTER_MODEL_FILTERS } from './constants';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
// jest.useFakeTimers();

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  xit('sets a 10 seconds interval when the component is mounted', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10000);
    ReactDOM.unmountComponentAtNode(div);
  });

  xit('fetches scooters on interval', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'fetchScooters');
    jest.runOnlyPendingTimers();
    expect(instance.fetchScooters).toHaveBeenCalledTimes(1);
  })

  it('shows the scooter model filter as disabled until the app finised loading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('isInitialAppStateLoaded')).toEqual(false);
    expect(wrapper.find('Select').props().disabled).toEqual(true);
    wrapper.setState({ isInitialAppStateLoaded: true });
    expect(wrapper.state('isInitialAppStateLoaded')).toEqual(true);
    expect(wrapper.find('Select').props().disabled).toEqual(false);
  });

  const SCOOTERS = {
    '27a986f7-0d81-481f-a43b-5e4f7639a52a': {
      id: '27a986f7-0d81-481f-a43b-5e4f7639a52a',
      model: SCOOTER_MODEL_FILTERS.GOGORO_V1,
      license_plate: "745ERA",
      energy_level: 52,
      location: {
        lng: 13.3790219058295,
        lat: 52.520945242182215
      }
    },
    '27a986f7-0d81-481f-a43b-5e4f7639a52b': {
      id: '27a986f7-0d81-481f-a43b-5e4f7639a52b',
      model: SCOOTER_MODEL_FILTERS.GOGORO_V2,
      license_plate: "745ERE",
      energy_level: 52,
      location: {
        lng: 13.3790219058295,
        lat: 52.520945242182215
      }
    },
  }

  it('updates the state with a filters list of scooter ids when a filter is changed', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    wrapper.setState({
      scooters: SCOOTERS,
      scooterIds: [
        '27a986f7-0d81-481f-a43b-5e4f7639a52a',
        '27a986f7-0d81-481f-a43b-5e4f7639a52b',
      ],
    });

    expect(wrapper.state('scooterIds')).toEqual([
      '27a986f7-0d81-481f-a43b-5e4f7639a52a',
      '27a986f7-0d81-481f-a43b-5e4f7639a52b',
    ]);

    instance.changeScooterFilter(SCOOTER_MODEL_FILTERS.GOGORO_V1);

    expect(wrapper.state('scooterIds')).toEqual([
      '27a986f7-0d81-481f-a43b-5e4f7639a52a',
    ]);
  });
});

describe('helpers', () => {
  describe('filters scooters by scooter model filter', () => {
    const scooters = {
      '27a986f7-0d81-481f-a43b-5e4f7639a52a': {
        model: SCOOTER_MODEL_FILTERS.GOGORO_V1,
      },
      '27a986f7-0d81-481f-a43b-5e4f7639a52b': {
        model: SCOOTER_MODEL_FILTERS.GOGORO_V2,
      },
    };

    it('filters none of the scooters when all is selected', () => {
      expect(filterScootersByModel(scooters, SCOOTER_MODEL_FILTERS.ALL)).toEqual([
        '27a986f7-0d81-481f-a43b-5e4f7639a52a',
        '27a986f7-0d81-481f-a43b-5e4f7639a52b',
      ]);
    });

    it('filters GOGORO_V1 scooters', () => {
      expect(filterScootersByModel(scooters, SCOOTER_MODEL_FILTERS.GOGORO_V1)).toEqual([
        '27a986f7-0d81-481f-a43b-5e4f7639a52a',
      ]);
    });

    it('filters GOGORO_V2 scooters', () => {
      expect(filterScootersByModel(scooters, SCOOTER_MODEL_FILTERS.GOGORO_V2)).toEqual([
        '27a986f7-0d81-481f-a43b-5e4f7639a52b',
      ]);
    });
  });
});
