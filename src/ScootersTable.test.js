import React from 'react';
import ScootersTable from './ScootersTable';
import renderer from 'react-test-renderer';
import apiMock from './apiMock.json';
describe('<ScootersTable />', () => {
  it('renders correctly', () => {
    const scooters = apiMock.data.scooters.slice(0, 10);
    const tree = renderer
      .create(<ScootersTable scooters={scooters} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
})
