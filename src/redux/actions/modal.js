export const showModal = (selector) => ({
  type: 'SHOW_MODAL',
  selector: selector,
  payload: true,
});

export const closeModal = (selector) => ({
  type: 'CLOSE_MODAL',
  selector: selector,
  payload: false,
});
