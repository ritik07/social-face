import React from 'react';
import { Button, Avatar, Divider } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const userData = useSelector((state) => state.userData.userData);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  };

  const onPersonalInfo = () => {
    navigate("/profile-personal-info")
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Avatar size={100} icon={<UserOutlined />} style={{ marginBottom: '20px' }} />
      <div style={{ marginBottom: '25px', fontSize: '18px' }}>{userData.first_name + " " + userData.last_name} </div>
      <Divider />
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => onPersonalInfo()} type="primary" size="large" style={{ marginRight: '10px' }}>Personal Info</Button>
        <Button size="large" onClick={handleLogout}><LogoutOutlined /> Logout</Button>
      </div>
    </div>
  );
};

export default Profile;
