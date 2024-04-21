import React from 'react'
import { useNavigate } from "react-router-dom";
import { Typography, message } from 'antd'
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = () => {
    messageApi.open({
      type: "success",
      content: "Logged out!!",
    });
    navigate("/login");
    localStorage.clear()
  }
  return (
    <div>
      {contextHolder}
      <div className='cs-logout-btn-container'>
        <Typography.Title onClick={handleLogout} className='cs-txt-white' level={5}>
          Logout
        </Typography.Title>
      </div>
    </div>
  )
}

export default Logout