import { useReducer, useEffect } from 'react';
import axios from 'axios';

// this url will act like a proxy
// https://api.allorigins.win/raw?url=
const BASE_URL =
  'https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

const initialState = {
  jobs: [],
  loading: true,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        jobs: [],
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        jobs: [],
      };
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // prevent multiple request
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: {
          markdown: true,
          page: page,
          ...params,
        },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({
          type: ACTIONS.ERROR,
          payload: err,
        });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);
  return state;
}
