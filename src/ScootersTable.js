import React from 'react';
import PropTypes from 'prop-types';
import { scooterShape } from './shapes'

const Row = ({ scooter }) => {
  return (
    <tr>
      <td>{scooter.id}</td>
      <td>{scooter.license_plate}</td>
      <td>{scooter.model}</td>
      <td>{scooter.energy_level}%</td>
    </tr>
  );
};

Row.propTypes = {
  scooter: scooterShape.isRequired,
};

const ScootersTable = ({ scooters, className }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Scooter</th>
          <th>Model</th>
          <th>Battery</th>
        </tr>
      </thead>
      <tbody>
        {scooters.map(scooter => <Row key={scooter.id} scooter={scooter} />)}
      </tbody>
    </table>
  );
};

ScootersTable.propTypes = {
  className: PropTypes.string,
  scooters: PropTypes.arrayOf(scooterShape).isRequired,
};

ScootersTable.defaultProps = {
  className: '',
};

export default ScootersTable;
