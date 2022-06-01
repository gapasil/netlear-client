const initialState = {
  isVebinarsItemSettingsModal: false,
  logoutModal: false,
};

const modal = (state = initialState, action) => {
  if (action.type === 'SHOW_MODAL') {
    const selector = action.selector;
    return {
      [selector]: action.payload,
    };
  }
  if (action.type === 'CLOSE_MODAL') {
    const selector = action.selector;
    return {
      [selector]: action.payload,
      // isVebinarsItemSettingsModal: action.payload,
    };
  }

  return state;
};

export default modal;
