import queryString from 'querystring';

const requestMethods = ['get', 'post', 'put', 'patch', 'delete'];
const request = {};
const apiEndpoint = process.env.API_ADDRESS;

requestMethods.forEach((requestMethod) => {
  request[requestMethod] = function doRequest(endpoint, params) {
    let address = endpoint;
    const requestObj = {
      method: requestMethod.toUpperCase(),
    };

    if (params.body) {
      requestObj.body = JSON.stringify(params.body || null);
    }

    if (params.query) {
      address += `?${queryString.stringify(params.query)}`;
    }

    return fetch(apiEndpoint + address)
      .then((response) => {
        if (response.ok && response.status >= 200 && response.status < 300) {
          if (response.status === 204) {
            return true;
          }

          return response.json();
        }

        return response.text()
          .then(result => Promise.reject(`(${response.status || 'no_error_code'}) ${result}`));
      });
  };
});

export default request;