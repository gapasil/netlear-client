import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

function Spinner({ children, color }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: color }} spin />;

  const { isSpinning } = useSelector((state) => state.spinner);
  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      {children}
    </Spin>
  );
}

export default Spinner;
