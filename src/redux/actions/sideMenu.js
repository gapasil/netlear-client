export const setSideMenuTrue = (selector, index) => ({
  type: 'SET_SIDE_MENU_TRUE',
  selector: selector,
  index: index,
  payload: true,
});

export const setSideMenuFalse = (selector) => ({
  type: 'SET_SIDE_MENU_FALSE',
  selector: selector,
  payload: false,
});
