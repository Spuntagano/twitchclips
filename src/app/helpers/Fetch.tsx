import 'isomorphic-fetch';

export default (url: string | Request, data?: RequestInit): Promise<Response> => {
  return fetch(url, data);
};
