import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const BottomActionBar = () => {
  return (
    <div className="bottom-action-bar">
      <Row justify="center" align="middle">
        <Col span={12}>
          <Link to="/home">
            <HomeOutlined style={{ fontSize: '24px', color: '#00b96b' }} />
          </Link>
        </Col>
        <Col span={12}>
          <Link to="/profile">
            <UserOutlined style={{ fontSize: '24px', color: '#00b96b' }} />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default BottomActionBar;
