import { useState } from 'react';

function initialState(args) {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args
  };
}

const useApi = () => {
  const [state, setState] = useState(() => initialState());

  const fetchData = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });

      if (res.status >= 400) {
        setState(
          initialState({
            error: await res.json(),
            isLoading: false
          })
        );
      } else {
        setState(
          initialState({
            response: await res.json(),
            isLoading: false
          })
        );
      }
    } catch (error) {
      setState(
        initialState({
          error: {
            error: error.message
          },
          isLoading: false
        })
      );
    }
  };

  return {
    ...state,
    fetchData
  };
};

export default useApi;
