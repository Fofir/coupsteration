import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  onChange = (evt) => {
    this.props.onChange(evt.target.value);
  }

  render() {
    const { disabled, options, value, className } = this.props;
    return (
      <select
        className={className}
        onChange={this.onChange}
        disabled={disabled}
        value={value}
      >
        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
    );
  }
};

Select.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  options: [],
  className: '',
  value: '',
  disabled: false,
};

export default Select;
