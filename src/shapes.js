import PropTypes from 'prop-types';
import { SCOOTER_MODELS } from './constants';

export const scooterShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  model: PropTypes.oneOf(Object.values(SCOOTER_MODELS)).isRequired,
  license_plate: PropTypes.string.isRequired,
  energy_level: PropTypes.number.isRequired,
  location: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
});
