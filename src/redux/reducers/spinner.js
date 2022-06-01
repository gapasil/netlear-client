const initialState = {
  isSpinning: false,
};

const spinner = (state = initialState, action) => {
  if (action.type === 'SET_SPIN_TRUE') {
    return {
      isSpinning: action.payload,
    };
  }
  if (action.type === 'SET_SPIN_FALSE') {
    return {
        isSpinning: action.payload,
    };
  }
  return state;
};

export default spinner;
