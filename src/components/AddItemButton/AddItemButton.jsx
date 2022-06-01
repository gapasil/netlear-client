import React from 'react';
import './AddItemButton.scss';
import { useDispatch } from 'react-redux';
import { setFullCourseCost } from '../../redux/actions/eventRedactor/eventRedactor';

import { PlusSquareTwoTone } from '@ant-design/icons';
import { Popover } from 'antd';

function AddItemButton({ selector, action }) {
  const dispatch = useDispatch();

  const onAddItem = () => {
    dispatch(action(selector));
    dispatch(setFullCourseCost());
  };

  return (
    <Popover
      placement="bottomRight"
      title={'Добавить элемент'}
      content={'Вы можете добавлять или удалять элементы из списка'}
      trigger="hover">
      <PlusSquareTwoTone
        className="add-item-button"
        onClick={onAddItem}
        style={{ fontSize: '40px' }}
      />
    </Popover>
  );
}

export default AddItemButton;
