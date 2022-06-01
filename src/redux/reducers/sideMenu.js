const initialState = {
  eventRedactor: false,
  fullCoursePayCard: false,
};

const sideMenu = (state = initialState, action) => {
  if (action.type === 'SET_SIDE_MENU_TRUE') {
    const selector = action.selector;
    const index = action?.index;
    return {
      [selector]: action.payload,
      index: index,
    };
  }
  if (action.type === 'SET_SIDE_MENU_FALSE') {
    const selector = action.selector;
    return {
      [selector]: action.payload,
    };
  }

  return state;
};

export default sideMenu;
