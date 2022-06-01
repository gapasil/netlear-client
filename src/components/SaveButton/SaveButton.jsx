import './SaveButton.scss';
import React from 'react';

import { Button } from 'antd';
import { LockFilled } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { setBannerSelectors } from '../../redux/actions/eventRedactor/eventRedactor';

function SaveButton({ selector, action }) {
  const dispatch = useDispatch();

  const onSaveElement = (e) => {
    const selector = e.target.closest('button').attributes.selector.nodeValue;
    dispatch(action(selector, false));
    console.log(selector);
  };
  return (
    <Button
      type="primary"
      selector={selector}
      onClick={onSaveElement}
      style={{ marginLeft: '10px' }}>
      <LockFilled />
      <span>Сохранить</span>
    </Button>
  );
}

export default SaveButton;
