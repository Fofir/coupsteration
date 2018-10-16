import React from 'react';
import Select from './Select';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Select />', () => {
  it('renders correctly with options', () => {
    const options = [{
      label: 'Type 1',
      value: 'type 1',
    }, {
      label: 'Type 2',
      value: 'type 2',
    }];

    const tree = renderer
      .create(<Select options={options} onChange={jest.fn()} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const options = [{
      label: 'Type 1',
      value: 'type 1',
    }, {
      label: 'Type 2',
      value: 'type 2',
    }];

    const tree = renderer
      .create(<Select options={options} disabled onChange={jest.fn()} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a custom className', () => {
    const options = [{
      label: 'Type 1',
      value: 'type 1',
    }, {
      label: 'Type 2',
      value: 'type 2',
    }];

    const tree = renderer
      .create(<Select options={options} className="my-select-class" disabled onChange={jest.fn()} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('shold call props.onChange with the new select value upon change', () => {
    const options = [{
      label: 'Type 1',
      value: 'type 1',
    }, {
      label: 'Type 2',
      value: 'type 2',
    }];
    const onChange = jest.fn();
    const wrapper = shallow(<Select options={options} onChange={onChange} />);
    const instance = wrapper.instance();
    instance.forceUpdate(); // to make sure the bound class method is spied on
    wrapper.find('select').simulate('change', { target: { value: 'type 2' }});
    expect(onChange).toHaveBeenCalledWith('type 2');
  });
});
