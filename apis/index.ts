const isProduction = process.env.PROD;

const baseUrl = () => {
  // const apiVersion = "/v1";
  let apiUrl;
  if (isProduction) {
    apiUrl = process.env.API_HOST || '';
  } else {
    apiUrl = process.env.API_HOST_DEV || 'https://global.ppbdevs.com';
  }
  return `${apiUrl}`;
};

const customFetch = $fetch.create({
  baseURL: baseUrl(),
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  // eslint-disable-next-line no-empty-function
  async onRequest(config) {},
  // eslint-disable-next-line no-empty-function
  async onResponse(response) {}
});

export const Get = (url: string) => {
  return customFetch(url, {
    method: 'GET'
  });
};
