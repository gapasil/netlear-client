import React from 'react';
import './SettingsButton';

import { useDispatch } from 'react-redux';

import { SettingTwoTone } from '@ant-design/icons';
import { Popover } from 'antd';

function SettingsButton({ onClick }) {
  return (
    <Popover
      placement="topRight"
      title={'Изменить настройки '}
      content={'Основные настройки элемента'}
      trigger="hover">
      <SettingTwoTone
        className="delete-button"
        onClick={onClick}
        style={{ fontSize: '24px', marginLeft: '5px' }}
      />
    </Popover>
  );
}

export default SettingsButton;
