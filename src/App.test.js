import React from 'react';
import ReactDOM from 'react-dom';
import App, { filterScootersByModel } from './App';
import { SCOOTER_MODEL_FILTERS } from './constants';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('updates the state with a filters list of scooter ids when a filter is changed', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  const scooters = {
    '27a986f7-0d81-481f-a43b-5e4f7639a52a': {
      model: SCOOTER_MODEL_FILTERS.GOGORO_V1,
    },
    '27a986f7-0d81-481f-a43b-5e4f7639a52b': {
      model: SCOOTER_MODEL_FILTERS.GOGORO_V2,
    },
  };
  wrapper.setState({
    scooters,
    scooterIds: [
      '27a986f7-0d81-481f-a43b-5e4f7639a52a',
      '27a986f7-0d81-481f-a43b-5e4f7639a52b',
    ]
  });
  expect(wrapper.state('scooterIds')).toEqual([
    '27a986f7-0d81-481f-a43b-5e4f7639a52a',
    '27a986f7-0d81-481f-a43b-5e4f7639a52b',
  ]);

  instance.changeScooterFilter(SCOOTER_MODEL_FILTERS.GOGORO_V1);
  expect(wrapper.state('scooterIds')).toEqual([
    '27a986f7-0d81-481f-a43b-5e4f7639a52a',
  ]);
})

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
