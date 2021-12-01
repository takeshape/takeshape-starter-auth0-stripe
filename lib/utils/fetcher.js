export const get = (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }).then((r) => r.json());

export const post = (url, body, options = {}) =>
  fetch(url, {
    ...options,
    body: typeof body !== 'string' ? JSON.stringify(body) : body,
    method: 'POST',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }).then((r) => r.json());

export const destroy = (url, body, options = {}) =>
  fetch(url, {
    ...options,
    body: typeof body !== 'string' ? JSON.stringify(body) : body,
    method: 'DELETE',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }).then((r) => r.json());
