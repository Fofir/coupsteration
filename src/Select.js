import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  onChange = (evt) => {
    this.props.onChange(evt.target.value);
  }

  render() {
    const { disabled, options } = this.props;
    return (
      <select
        onChange={this.onChange}
        disabled={disabled}
      >
        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
    );
  }
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  disabled: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  options: [],
  disabled: false,
};

export default Select;
