import React from 'react';
import './SideMenu.scss';

import { useSelector, useDispatch } from 'react-redux';
import { setSideMenuFalse, setSideMenuTrue } from '../../redux/actions/sideMenu';

import { Drawer } from 'antd';

function SideMenu({ children, selector, title }) {
  const dispatch = useDispatch();
  const sideMenuState = useSelector((state) => state.sideMenu);

  const showDrawer = () => {
    dispatch(setSideMenuTrue(selector));
  };

  const onClose = () => {
    dispatch(setSideMenuFalse(selector));
  };

  return (
    <Drawer
      title={title}
      contentWrapperStyle={{ width: '375px' }}
      placement="left"
      closable={false}
      onClose={onClose}
      visible={sideMenuState[selector]}
      key="left">
      {children}
    </Drawer>
  );
}

export default SideMenu;
