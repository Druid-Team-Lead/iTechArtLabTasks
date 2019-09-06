const X_RAPIDAPI_HOST = "community-open-weather-map.p.rapidapi.com";
const X_RAPIDAPI_KEY = "89fd4dcec1msh380ae180876442cp1622c7jsn1e9eaa994091";
const API_ROOT = "https://community-open-weather-map.p.rapidapi.com/";

const callApi = (endpoint, city = "Minsk") => {
  const fullUrl = API_ROOT + endpoint;

  return fetch(`${fullUrl}?q=${city}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": X_RAPIDAPI_HOST,
      "x-rapidapi-key": X_RAPIDAPI_KEY
    }
  }).then(response => response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    
    return json;
  }));
};

export default callApi;