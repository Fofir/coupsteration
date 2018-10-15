import axios from 'axios';

const BASE_URL = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod';

class ScootersApi {
  all() {
    return axios.get(`${BASE_URL}/scooters`)
      .then(resp => resp.data);
  }
}

export default ScootersApi;
