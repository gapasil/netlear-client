import React from 'react';
import './EditButton.scss';

import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { setBannerSelectors } from '../../redux/actions/eventRedactor/eventRedactor';

function EditButton({ selector, action }) {
  const dispatch = useDispatch();

  const onEditElement = (e) => {
    const selector = e.target.closest('button').attributes.selector.nodeValue;
    dispatch(action(selector, true));
    console.log(selector);
  };

  return (
    <Button
      type="primary"
      size="small"
      selector={selector}
      onClick={onEditElement}
      style={{ marginLeft: '10px' }}>
      <EditFilled />
    </Button>
  );
}

export default EditButton;
