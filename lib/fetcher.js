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

export const upload = (url, file, callback) => {
  const xhr = new XMLHttpRequest();
  let done = false;
  let progress = 0;

  xhr.upload.onprogress = (evt) => {
    if (evt.lengthComputable) {
      progress = (evt.loaded / evt.total) * 100;
      callback({ progress, done });
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      done = true;
      if (xhr.status === 200) {
        callback({ progress, done });
      } else {
        callback({ progress, done, error: xhr.statusText });
      }
    }
  };

  xhr.open('PUT', url);
  xhr.send(file);

  // return cancel function
  return () => {
    if (!done) {
      xhr.abort();
    }
  };
};
