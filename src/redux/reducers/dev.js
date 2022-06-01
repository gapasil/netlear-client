const initialState = {
  isPaidVideo: false,
};

const dev = (state = initialState, action) => {
  if (action.type === 'SET_PAID_VIDEO') {
    return {
      ...state,
      isPaidVideo: action.payload,
    };
  }
  return state;
};

export default dev;
