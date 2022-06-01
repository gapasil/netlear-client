import React from 'react';
import './DeleteButton.scss';
import { useDispatch } from 'react-redux';

// import { Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { Popover } from 'antd';

function DeleteButton({ index, action }) {
  const dispatch = useDispatch();

  const onDeleteItem = (e) => {
    dispatch(action(index));
    console.log(index);
  };

  return (
    <Popover
      placement="topRight"
      title={'Удалить элемент'}
      content={'Вы можете удалять или добавлять элементы в список'}
      trigger="hover">
      <DeleteTwoTone
        className="delete-button"
        onClick={onDeleteItem}
        style={{ fontSize: '24px', marginLeft: '5px' }}
      />
    </Popover>
  );
}

export default DeleteButton;
