import React from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {closeModal } from '../../../redux/actions/modal';

function ModalWindow({
  children,
  title,
  onClickOk = () => {},
  onClickCancel = () => {},
  selector,
}) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(closeModal(selector));

    onClickOk();
  };

  const handleCancel = () => {
    dispatch(closeModal(selector));

    onClickCancel();
  };

  return (
    <Modal title={title} visible={modal[selector]} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
}

export default ModalWindow;
