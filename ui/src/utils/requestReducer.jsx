const SET_LOADING = 'SET_LOADING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';

export const RequestReducer = {
    reducer: (state, action) => {
        switch (action.type) {
          case SET_LOADING:
            return { ...state, error: undefined, loading: action.payload };
          case SET_DATA:
            return { ...state, data: action.payload, loading: false, error: undefined };
          case SET_ERROR:
            return { ...state, error: action.payload, loading: false };
          default:
            return state;
        }
    },
    setError: (payload) => {
        return { type: SET_ERROR, payload };
    },
    setData: (payload) => {
        return { type: SET_DATA, payload };
    },
    setLoading: (payload) => {
        return { type: SET_LOADING, payload };
    }
}