const development = {
  API_URL = 'http://localhost:8080/testsite/wp-json/system-api/v1/'
}

const production = {
  API_URL = 'http://system.seatriever.com/wp-json/system-api/v1/'
}

const config = process.env.REACT_APP_ENVIRONMENT === 'production' ? production : development;

export default config;